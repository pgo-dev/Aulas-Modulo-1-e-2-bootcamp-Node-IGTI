//Forma síncrona, não recomendável

import fs from "fs"

try{
  console.log('1')
  fs.writeFileSync('teste.txt', 'conteudo')
  console.log('2')
  const data = fs.readFileSync('teste.txt', 'utf-8')
  console.log(data)
  console.log('3')
}catch{
  console.log('Erro')
}
