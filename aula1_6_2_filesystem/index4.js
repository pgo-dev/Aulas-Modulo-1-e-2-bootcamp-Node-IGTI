import {promises as fs} from 'fs'

async function init(){
  try{
    
    await fs.writeFile('teste.txt', 'Await')
    await fs.appendFile('teste.txt', '\nteste append file')
    const data = await fs.readFile('teste.txt', 'utf-8')
    console.log(data)

  }catch{
    console.log(err)
  }
}

init()