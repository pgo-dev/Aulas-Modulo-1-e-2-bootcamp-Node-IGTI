import express from 'express'

const app = express()

app.get('/', (req, res)=>{
  res.send('Hello world')
})

app.post('/', (req, res)=>{
  const a = 3
  const b = 5
  const resultado = soma(a,b)
  res.send(`Resultado: ${resultado}`)
  console.log(res.statusCode)
})

function soma(a,b){
  return a+b
}

app.listen(3000, ()=>{
  console.log('API Started')
})