import accountServices from'../services/account.services.js'

async function createAccount(req, res, next){
  try{
    let account = req.body
    if(!account.name || account.balance==null){
      throw new Error('Fill both name and balance')
    }
    account = await accountServices.createAccount(account)
    res.send(account)
    logger.info(`POST /account - ${JSON.stringify(account)}`)
  }catch(err){
    next(err)
  }
}

async function getAccounts(req, res, next){
  try{
    res.send(await accountServices.getAccounts())
    logger.info(`GET /account`)
  }catch(err){
    next(err)
  }
}

async function getAccountById(req, res, next){
  try{
    const id = parseInt(req.params.id)
    const account = await accountServices.getAccountById(id)
    res.send(account)
    logger.info(`GET /account/:id - ${JSON.stringify(account)}`)
  }catch(err){
    next(err)
  }
}

async function deleteAccount(req,res,next){
  try{
    const id = parseInt(req.params.id)
    const account = await accountServices.deleteAccount(id)
    res.end()
    logger.info(`DELETE /account - ${id}`)
  }catch(err){
    next(err)
  }
}

async function updateAccount(req,res,next){
  try{
    let account = req.body
    if(!account.id ||!account.name || account.balance==null){
      throw new Error('Fill ID, name and balance')
    }
    const newAccount = await accountServices.updateAccount(account)
    res.send(newAccount)
    logger.info(`PUT /account - ${JSON.stringify(account)}`)
  }catch(err){
    next(err)
  }
}

async function updateBalance(req,res,next){
  try{
    let account = req.body
    if(!account.id || account.balance==null){
      throw new Error('Fill both ID and balance')
    }
    const newAccount = await accountServices.updateBalance(account)
    res.send(newAccount)
    logger.info(`PATCH /account/updatebalance - ${JSON.stringify(account)}`)
  }catch(err){
    next(err)
  }
}

export default {
  createAccount,
  getAccounts,
  getAccountById,
  deleteAccount,
  updateAccount,
  updateBalance
}
