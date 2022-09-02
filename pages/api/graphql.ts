import { ApolloServer, gql } from 'apollo-server-micro'
import type { NextApiRequest, NextApiResponse, PageConfig } from 'next'

const typeDefs = gql`
  type Query {
    sayHello: String
  }
`

const resolvers = {
  Query: {
    sayHello() {
      return 'Hello World!'
    },
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })
const handler = apolloServer.start()
  .then(() => apolloServer.createHandler({ path: '/api/graphql' }))

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV === 'development') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
  }

  await (await handler)(req, res)
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}
