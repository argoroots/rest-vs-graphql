const router = require('express').Router()

router.get('/', function (req, res) {
  const posts = req.app.locals.posts

  res.json(posts)
})

router.get('/:id', function (req, res) {
  const post = req.app.locals.posts.find(p => p.id === parseInt(req.params.id))

  if (post) {
    res.json(post)
  } else {
    res.status(404).json()
  }
})

router.get('/:id/comments', function (req, res) {
  const post = req.app.locals.posts.find(p => p.id === parseInt(req.params.id))

  if (post) {
    const comments = req.app.locals.comments.filter(c => c.post_id === post.id)

    res.json(comments)
  } else {
    res.status(404).json()
  }
})

router.post('/:id/comments', function (req, res) {
  const post = req.app.locals.posts.find(p => p.id === parseInt(req.params.id))

  if (post) {
    const comment = {
      id: req.app.locals.comments.length + 1,
      post_id: post.id,
      created_at: new Date().toISOString(),
      author: req.body.author,
      body: req.body.body
    }

    req.app.locals.comments.push(comment)

    res.status(201).json(comment)
  } else {
    res.status(404).json()
  }
})

module.exports = router
