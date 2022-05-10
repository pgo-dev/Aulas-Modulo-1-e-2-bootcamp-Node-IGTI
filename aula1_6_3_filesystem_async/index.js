import {promises as fs} from "fs"

async function writeReadJson(){
  try{
    //escrita com valores iniciais 
    const arrayCarros = ['Gol', 'Palio', 'Uno']

    const obj = {
      carros: arrayCarros
    }
    await fs.writeFile('teste.json', JSON.stringify(obj) )

    //leitura do conteudo atual
    const data = JSON.parse(await (fs.readFile('teste.json')))

    //adição de dados
    data.carros.push('Sandero')

    //sobrescrição de dados com conteúdo alterado
    await fs.writeFile('teste.json', JSON.stringify(data))

  }catch (err){
    console.log(err)
  }
}

writeReadJson()