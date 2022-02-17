const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const port = process.env.PORT || 4000
const app = express()

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true
}))

app.listen(port, () => {
  console.log(`GraphQL server listening on port ${port}`)
})
