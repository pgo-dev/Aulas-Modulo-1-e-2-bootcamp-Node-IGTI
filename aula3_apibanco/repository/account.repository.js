import { promises as fs } from 'fs'
const { readFile, writeFile } = fs

async function getAccounts(){
  const data = JSON.parse(await readFile(global.fileName))
  return data.accounts
}

async function getAccountById(id){
  const accounts = await getAccounts()
  const account = accounts.find(account=>account.id === id)
  if(account==undefined){
    throw new Error('Wrong ID')
  }
  return account
}

async function insertAccount(account){
  const data = JSON.parse(await readFile(global.fileName))
  account = {
    id: data.nextId++,
    name: account.name,
    balance: account.balance
  }
  data.accounts.push(account)
  await writeFile(global.fileName, JSON.stringify(data))
  return account
}

async function deleteAccount(id){
  const data = JSON.parse(await readFile(global.fileName))
  const account = data.accounts.find(account=>account.id === id)
  data.accounts = data.accounts.filter(account=>account.id!==id)
  if(account==undefined){
    throw new Error('Wrong ID')
  }
  await writeFile(global.fileName, JSON.stringify(data))
}

async function updateAccount(account){
  const data = JSON.parse(await readFile(global.fileName))
  const index = data.accounts.findIndex(acc=>acc.id===account.id)

  if(index===-1){
    throw new Error('Wrong ID')
  }

  data.accounts[index].name = account.name
  data.accounts[index].balance = account.balance
  await writeFile(global.fileName, JSON.stringify(data))
  return data.accounts[index]
}

export default{
  getAccounts,
  insertAccount,
  getAccountById,
  deleteAccount,
  updateAccount,
}