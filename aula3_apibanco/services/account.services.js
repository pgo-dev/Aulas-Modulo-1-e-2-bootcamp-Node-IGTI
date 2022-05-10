import accountRepository from '../repository/account.repository.js'

async function createAccount(account){
  return await accountRepository.insertAccount(account)
}

async function getAccounts(){
  return await accountRepository.getAccounts()
}

async function getAccountById(id){
  return await accountRepository.getAccountById(id)
}

async function deleteAccount(id){
  await accountRepository.deleteAccount(id)
}

async function updateAccount(account){
  return await accountRepository.updateAccount(account)
}

async function updateBalance(account){
  const acc = await accountRepository.getAccountById(account.id)
  acc.balance = account.balance
  return await accountRepository.updateAccount(acc)
}

export default {
  createAccount,
  getAccounts,
  getAccountById,
  deleteAccount,
  updateAccount,
  updateBalance
}