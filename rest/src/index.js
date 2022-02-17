const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.locals.authors = require('../../data/authors.json')
app.locals.posts = require('../../data/posts.json')
app.locals.comments = require('../../data/comments.json')

app.use(express.json())

app.use('/authors', require('./routes/authors.js'))
app.use('/posts', require('./routes/posts.js'))

app.listen(port, () => {
  console.log(`REST server listening on port ${port}`)
})
