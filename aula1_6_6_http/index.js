import http from 'http'

const server = http.createServer((req, res)=>{
  if(req.method==='GET' && req.url==='/teste'){
    res.write('Get executado com Sucesso!')
  }else{
    res.write('Hello World')
  }
  res.statusCode = 200
  res.end()
})

server.listen(8080)