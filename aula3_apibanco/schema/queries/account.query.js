import { GraphQLInt, GraphQLList } from "graphql"
import Account from '../types/account.js'
import accountResolver from '../resolvers/account.resolver.js'

const accountQueries = {
  getAccounts: {
    type: new GraphQLList(Account),
    resolve: () => accountResolver.getAccounts()
  },
  getAccountById:{
    type: Account,
    args:{
      id:{
        name: 'id',
        type: GraphQLInt
      }
    },
    resolve: (_, args) => accountResolver.getAccountById(args.id)
  }
}

export default accountQueries