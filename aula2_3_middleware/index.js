import express from 'express'
import carrosRouters from './carrosRouters.js'

const app = express()
app.use(express.json())

app.use('/carros', carrosRouters)

app.use((req,res,next)=>{
  console.log(new Date())
  next()
})

app.get('/teste', (req, res) =>{
  res.end()
})

app.listen(3000, ()=>{
  console.log('API started')
})
