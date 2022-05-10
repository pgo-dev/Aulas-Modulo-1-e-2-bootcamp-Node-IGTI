import express from 'express'

const app = express()
app.use(express.json())

app.get('/', (req,res)=>{
  throw new Error('Error message test')
})

app.post('/', async (req, res, next)=>{
  console.log('tentativa de post')
  try{
    throw new Error('ERROR async')
  }catch(err){
    next(err)
  }
})

app.use((err, req, res, next)=>{
  console.log('Error 1')
  res.status(500).send('ERROR')
  next(err)
})

app.use((err, req, res, next)=>{
  console.log('Error 2')
  res.status(500).send('ERROR 2')
})

app.listen(3000, ()=>{
  console.log('API started')
})