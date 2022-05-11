import express from 'express'
import accountsRouter from './routes/account.routes.js'
import { promises as fs } from 'fs'
import winston from 'winston'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import {swaggerDocument} from './doc.js'
import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'
import accountService from './services/account.services.js'
import Schema from './schema/index.js'
import basicAuth from 'express-basic-auth'
import { allowedNodeEnvironmentFlags } from 'process'

const { readFile, writeFile } = fs
global.fileName = 'accounts.json'

const { combine, timestamp, label, printf } = winston.format
const myFormat = printf(({level, message, label, timestamp})=>{
  return `${timestamp} [${label}] ${level}: ${message}`
})
global.logger = winston.createLogger({
  level:"silly",
  transports:[
    new(winston.transports.Console)(),
    new (winston.transports.File)({filename: "my-bank-api.log"})
  ],
  format: combine(
    label({ label: "my-bank-api"}),
    timestamp(),
    myFormat
  )
})

/*const schema = buildSchema(`
  type Account{
    id: Int
    name: String
    balance: Float
  }
  input accountInput{
    id: Int
    name: String
    balance: Float
  }
  type Query {
    getAccounts: [Account]
    getAccountById(id: Int): Account
  }
  type Mutation{
    createAccount(account: accountInput): Account
    deleteAccount(id: Int): Boolean
    updateAccount(account: accountInput): Account
  }
`)

const root = {
  getAccounts: () => accountService.getAccounts(),
  getAccountById(args){
    return accountService.getAccountById(args.id)
  },
  createAccount({account}){
    return accountService.createAccount(account)
  },
  deleteAccount(args){
    accountService.deleteAccount(args.id)
  },
  updateAccount({account}){
    return accountService.updateAccount(account)
  }
}*/

const app = express()
app.use(express.json())
//app.use(cors())
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

function getRole(username){
  if(username =='admin'){
    return 'admin'
  }else if(username == 'paulo'){
    return 'role1'
  }
}

function authorize(...allowed){
  const isAllowed = role => allowed.indexOf(role) > -1
  return (req, res, next) =>{
    if(req.auth.user){
      const role = getRole(req.auth.user)
      if(isAllowed(role)){
        next()
      }else{
        res.status(401).send({message:'Role not allowed'})
      }
    }else{
      res.status(403).send({message:'User not found'})
    }
  }
}

app.use(basicAuth({
  authorizer:(username, password)=>{
    const userMatches = basicAuth.safeCompare(username, 'admin')
    const pwdMatches = basicAuth.safeCompare(password, 'admin')

    const user2Matches = basicAuth.safeCompare(username, 'paulo')
    const pwd2Matches = basicAuth.safeCompare(password, '1234')

    return userMatches && pwdMatches || user2Matches && pwd2Matches
  }
}))

app.use('/account', authorize('admin'), accountsRouter)
app.use(express.static('public'))

app.use('/graphql', graphqlHTTP({
  schema: Schema,
  //rootValue: root,
  graphiql: true
}))

app.listen(3000, async () => {
  try{
    await readFile(global.fileName)
    logger.info("API Started")
    console.log('API STARTED')
  }catch{
  const initialJson = {
    nextId: 1,
    accounts:[]
  }
  writeFile(global.fileName, JSON.stringify(initialJson)).then(()=>{
    console.log('API STARTED, .json created')
    logger.info('API STARTED, .json created')
  }).catch(err=>{
    console.log(err)
    logger.error(err)
  })
  }
})
