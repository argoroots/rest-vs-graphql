const fs = require('fs')
const path = require('path')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const port = process.env.PORT || 4000
const schemaFilePath = path.join(__dirname, './schema.gql')
const schemaFile = fs.readFileSync(schemaFilePath, { encoding: 'utf8', flag: 'r' })

const app = express()

app.use('/graphql', graphqlHTTP({
  schema: buildSchema(schemaFile),
  graphiql: true
}))

app.listen(port, () => {
  console.log(`GraphQL server listening on port ${port}`)
})
