import {promises as fs} from "fs"

fs.writeFile('teste.txt', 'Promises').then(()=>{
  fs.appendFile('teste.txt', '\nTeste append file').then(()=>{
    fs.readFile('teste.txt','utf-8').then(resp=>{
      console.log(resp)
    }).catch(err => {
    console.log(err)
    })
  }).catch(err => {
    console.log(err)
  })
}).catch(err =>{
  console.log(err)
})