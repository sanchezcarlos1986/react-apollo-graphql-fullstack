import express from 'express'
// graphql
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './data/schema'
import { resolvers } from './data/resolvers'
 
const app = express()
const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({app})

const PORT = { port: 8000 }
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT.port}${server.graphqlPath}`))