const router = require('express').Router()

router.get('/', function (req, res) {
  const authors = req.app.locals.authors

  res.json(authors)
})

router.get('/:id', function (req, res) {
  const author = req.app.locals.authors.find(a => a.id === parseInt(req.params.id))

  if (author) {
    res.json(author)
  } else {
    res.status(404).json()
  }
})

router.get('/:id/posts', function (req, res) {
  const author = req.app.locals.authors.find(a => a.id === parseInt(req.params.id))

  if (author) {
    const posts = req.app.locals.posts.filter(p => p.author_id === author.id)

    res.json(posts)
  } else {
    res.status(404).json()
  }
})

router.post('/:id/posts', function (req, res) {
  const author = req.app.locals.authors.find(a => a.id === parseInt(req.params.id))

  if (author) {
    const post = {
      id: req.app.locals.posts.length + 1,
      author_id: author.id,
      created_at: new Date().toISOString(),
      title: req.body.title,
      body: req.body.body
    }

    req.app.locals.posts.push(post)

    res.status(201).json(post)
  } else {
    res.status(404).json()
  }
})

module.exports = router
