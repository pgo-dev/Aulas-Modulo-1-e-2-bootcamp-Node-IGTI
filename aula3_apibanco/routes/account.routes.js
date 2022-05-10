import express from 'express'
import accountController from '../controllers/account.controller.js'

const router = express.Router()

router.post('/', accountController.createAccount)
router.get('/', accountController.getAccounts)
router.get('/:id', accountController.getAccountById)
router.delete('/:id', accountController.deleteAccount)
router.put('/', accountController.updateAccount)
router.patch('/updatebalance', accountController.updateBalance)

router.use((err, req, res, next)=>{
  logger.error(`${req.method} - ${req.baseUrl} ${err.message}`)
  console.log(err)
  res.status(400).send({error:err.message})
})

export default router