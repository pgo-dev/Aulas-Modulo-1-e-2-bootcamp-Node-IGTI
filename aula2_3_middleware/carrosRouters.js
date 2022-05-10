import express from 'express'

const router = express.Router()

router.get('/',(req, res)=>{
  console.log('carros')
  res.send('carros')
})

router.get('/preco',(req, res)=>{
  console.log('preco carros')
  res.send('preco carros')
})

export default router