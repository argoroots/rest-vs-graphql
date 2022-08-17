const fs = require('fs')
const path = require('path')
const { createServer, createPubSub } = require('@graphql-yoga/node')

const typeDefs = fs.readFileSync(path.join(__dirname, './schema.gql'), { encoding: 'utf8', flag: 'r' })
const resolvers = require('./resolvers')

const server = createServer({
  typeDefs,
  resolvers,
  context: {
    pubsub: createPubSub()
  }
})

const options = {
  port: process.env.PORT || 4000
}

server.start(options, ({ port }) => {
  console.log(`GraphQL server listening on port ${port}`)
})
