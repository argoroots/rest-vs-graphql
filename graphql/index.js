const fs = require('fs')
const path = require('path')
const { GraphQLServer, PubSub } = require('graphql-yoga')

const typeDefs = fs.readFileSync(path.join(__dirname, './schema.gql'), { encoding: 'utf8', flag: 'r' })
const resolvers = require('./resolvers')

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    pubsub: new PubSub()
  }
})

const options = {
  port: process.env.PORT || 4000
}

server.start(options, ({ port }) => {
  console.log(`GraphQL server listening on port ${port}`)
})
