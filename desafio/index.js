import express from 'express'
import {promises as fs} from 'fs'
import ordersRoute from './routes/ordersRoutes.js'

const {readFile, writeFile} = fs
global.fileName = 'orders.json'

const app = express()
app.use(express.json())
app.use('/orders', ordersRoute)

app.listen(3000, async ()=>{
  try{
    await readFile(global.fileName)
    console.log('API started!')
  }catch{
    try{
      const initialJson ={ 
        nextId: 1,
        orders: []
      }
      await writeFile(global.fileName, JSON.stringify(initialJson))
      console.log('API started anda .json created!')
      }catch(err){
        console.log(err)
      }
  }
})