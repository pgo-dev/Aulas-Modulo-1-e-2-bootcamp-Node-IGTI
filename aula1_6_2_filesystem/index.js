//forma assíncrona com callbacks

import fs from "fs"

console.log('1')
fs.writeFile('teste.txt', 'bla bla bla', (err)=>{
  console.log('2')
  if(err){
    console.log(err)
  }else{
    fs.appendFile('teste.txt', '\nteste appendFile',(err)=>{
      if(err){
        console.log(err)
      }else{
        fs.readFile('teste.txt', 'utf-8', (err, data)=>{
          if(err){
            console.log(err)
          }else{
            console.log(data)
          }
        })
      }
    })
  }
})
console.log('3')
