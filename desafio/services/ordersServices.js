import {promises as fs} from 'fs'
const {readFile, writeFile} = fs

async function getOrders(){
  const data = JSON.parse(await readFile(global.fileName))
  return data.orders
}

async function getOrderById(id){
  const orders = await getOrders()
  const order = orders.find(obj=>obj.id===id)
  if (order==undefined){
    throw new Error('Wrong Id')
  }
  return order
}

async function totalOrders(key, param){
  const orders = await getOrders()
  let totalOrders = 0 
  for(let order of orders){
      for(let k of Object.keys(order)){
        for(let v of Object.values(order)){
          if(k.toUpperCase() === key.toUpperCase() && typeof v =='string' && order.delivered == true){
            if(v.toUpperCase()===param.toUpperCase()){
              totalOrders += order.value
            }
          }
        }
      }
  }
  return totalOrders
}

export default {
  getOrders,
  getOrderById,
  totalOrders
}