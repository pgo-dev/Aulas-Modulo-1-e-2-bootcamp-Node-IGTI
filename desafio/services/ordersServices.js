import {promises as fs} from 'fs'
import { cursorTo } from 'readline'
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

async function totalOrdersValue(key, param){
  const orders = await getOrders()
  const ordersValue = orders
    .filter(obj=>obj[key]===param && obj.delivered == true)
  let totalOrders = 0
  for(let i of ordersValue){
    totalOrders = i.value + totalOrders
  }
  return totalOrders
}

async function totalOrdersQuant(key, param){
  const orders = await getOrders()
  const ordersValues = orders
    .filter(obj=>obj[key]===param && obj.delivered == true)
  let totalOrders = ordersValues.length
  return totalOrders
}

export default {
  getOrders,
  getOrderById,
  totalOrdersValue,
  totalOrdersQuant
}