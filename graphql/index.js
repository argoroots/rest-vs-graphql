const fs = require('fs')
const path = require('path')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const port = process.env.PORT || 4000

const schemaFile = fs.readFileSync(path.join(__dirname, './schema.gql'), { encoding: 'utf8', flag: 'r' })

const resolvers = require('./resolvers.js')
const app = express()

app.use('/', graphqlHTTP({
  schema: makeExecutableSchema({ typeDefs: schemaFile, resolvers }),
  graphiql: process.env.NODE_ENV !== 'production'
}))

app.listen(port, () => {
  console.log(`GraphQL server listening on port ${port}`)
})
