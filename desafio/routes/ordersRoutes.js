import express from 'express'
import ordersControllers from '../controllers/ordersControllers.js'

const router = express.Router()

router.get('/', ordersControllers.getOrders)
router.get('/totalOrdersClient', ordersControllers.totalOrders)
router.get('/totalOrdersProduct', ordersControllers.totalOrders)
router.get('/mostOrdered', ordersControllers.mostOrdered)
router.get('/:id', ordersControllers.getOrderById)
router.post('/', ordersControllers.createOrder)
router.put('/updateOrder/:id', ordersControllers.updateOrder)
router.delete('/:id', ordersControllers.deleteOrder)
router.patch('/:id', ordersControllers.delivered)

router.use((err, req, res, next)=>{
  console.log(err)
  res.status(400).send({error:err.message})
})

export default router