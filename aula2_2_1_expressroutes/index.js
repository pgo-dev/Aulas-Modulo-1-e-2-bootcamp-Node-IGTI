import express from 'express'

const app = express()
app.use(express.json())

//all
app.all('/testeall', (req, res)=>{
  res.send(req.method)
})

//caracteres especiais
app.get('/teste?', (req,res)=>{
  res.send(`${req.method} ${req.url}`)
})

app.get('/buzz+', (req,res)=>{
  res.send(`${req.method} ${req.url}`)
})

app.get('/one*Blue', (req,res)=>{
  res.send(req.path)
})

app.post('/test(ing)?', (req,res)=>{
  console.log(req.body)
  res.send(req.path)
})

app.get(/.*Red$/, (req,res)=>{
  res.send('/.*Red$/')
})

//parametros na rota
app.get('/testeParams/:id/:a?', (req,res)=>{
  res.send(req.params.id+' '+req.params.a)
})

//parametros via query
app.get('/testQuery', (req,res)=>{
  res.send(req.query)
})

//next
app.get('/testHandlers', (req,res, next)=>{
  console.log('Callback 1')
  next()
}, (req, res)=>{
  console.log('Callback 2')
  res.send('Finalizar')
})

//next with array
const callback1 = (req, res, next)=>{
  console.log('Callback 1')
  next()
}
const callback2 = (req, res, next)=>{
  console.log('Callback 2')
  next()
}
const callback3 = (req, res, next)=>{
  console.log('Callback 3')
  res.send('Finalizar')
}

app.get('/testHandlersArray', [callback1, callback2, callback3])

//route
app.route('/testRoute')
  .get((req,res)=>{
    res.send(`${req.method} ${req.url}`)
})
  .post((req,res)=>{
    res.send(`${req.method} ${req.url}`)
  })
  .delete((req,res)=>{
    res.send(`${req.method} ${req.url}`)
  })

//listen
app.listen(3000,()=>{
  console.log('API started')
})