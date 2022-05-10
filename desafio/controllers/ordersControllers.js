import {promises as fs} from 'fs'
import ordersServices from '../services/ordersServices.js'

const {readFile, writeFile} = fs

async function getOrders(req, res, next){
  try{
    const orders = await ordersServices.getOrders()
    res.send(orders)
  }catch(err){
    next(err)
  }
}

async function totalOrders(req, res, next){
  try{
    const key = Object.keys(req.body).toString().toUpperCase()
    const param = Object.values(req.body).toString().toUpperCase()
    const totalOrders = await ordersServices.totalOrders(key, param)
    res.send({total: totalOrders})
  }catch(err){
    next(err)
  }
}

async function getOrderById(req, res, next){
  try{
    const id = parseInt(req.params.id)
    const order = await ordersServices.getOrderById(id)
    res.send(order)
  }catch(err){
    next(err)
  }
}

async function createOrder(req, res, next){
  try{
    const data = JSON.parse(await readFile(global.fileName))
    if(!req.body.client || !req.body.product || req.body.value==null){
      throw new Error('blank fields')
    }
    const order = {
      id: data.nextId++,
      ...req.body,
      delivered: false,
      timestamp: new Date(),
    }
    data.orders.push(order)
    await writeFile(global.fileName, JSON.stringify(data))

    res.send(order)
  }catch(err){
    next(err)
  }
}

async function updateOrder(req,res, next){
  try{
    const id = parseInt(req.params.id)
    const data = JSON.parse(await readFile(global.fileName))
    const order = data.orders.find(obj=>obj.id===id)

    if (order==undefined){
      throw new Error('Wrong Id')
    }
    if(!req.body.client || !req.body.product || req.body.value==null){
      throw new Error('blank field')
    }
    if (req.body.product.toUpperCase() !== order.product.toUpperCase()){
      throw new Error('Different product')
    }

    order.client = req.body.client
    order.product = req.body.product
    order.value = req.body.value

    await writeFile(global.fileName, JSON.stringify(data))
    
    res.send(order)
  }catch(err){
    next(err)
  }
}

async function deleteOrder(req, res, next){
  try{
    const id = parseInt(req.params.id)
    const data = JSON.parse(await readFile(global.fileName))
    data.orders = data.orders.filter(obj=>obj.id!==id)

    await writeFile(global.fileName, JSON.stringify(data))
  
    res.send(data.orders)
  }catch(err){
    next(err)
  }
}

async function delivered(req, res, next){
  try{
    const id = parseInt(req.params.id)
    const data = JSON.parse(await readFile(global.fileName))
    const order = data.orders.find(obj=>obj.id===id)

    if(order===undefined){
      throw new Error('Wrong ID')
    }
    if(order.delivered==true){
      res.send({message: `Order ${id} already delivered`})
    }else{
      order.delivered = true
      await writeFile(global.fileName, JSON.stringify(data))
      res.send(order)
    }
  }catch(err){
    next(err)
  }
}

async function mostOrdered(req, res, next){
  try{
    const orders = await ordersServices.getOrders()
    const products = []
    orders.forEach(obj=>{
        products.push(obj.product)
        if(products.filter(e=>e==obj.product).length>1){
          products.pop(obj.product)
        }
    })

    let mostOrdereds = []
    for(let product of products){
      mostOrdereds.push({product, value: await ordersServices.totalOrders("product",product)})
    }
    mostOrdereds.sort((a,b)=>{
      return b.value-a.value
    })
    for(let i =0; i<mostOrdereds.length; i++){
      mostOrdereds[i]=`${mostOrdereds[i].product} - ${mostOrdereds[i].value}`
    }
    res.send(mostOrdereds)
  }catch(err){
    next(err)
  }
}

export default{
  getOrders,
  totalOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  delivered,
  mostOrdered
}