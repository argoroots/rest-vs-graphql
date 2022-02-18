const allAuthors = require('../data/authors.json')
const allPosts = require('../data/posts.json')
const allComments = require('../data/comments.json')

function authors () {
  return allAuthors
}

function author (_, { id }) {
  return allAuthors.find(a => a.id === parseInt(id))
}

function posts () {
  return allPosts
}

function post (_, { id }) {
  return allPosts.find(p => p.id === parseInt(id))
}

function authorPosts ({ id }) {
  return allPosts.filter(p => p.author_id === parseInt(id))
}

function postAuthor ({ author_id }) {
  return allAuthors.find(a => a.id === parseInt(author_id))
}

function postComments ({ id }) {
  return allComments.filter(c => c.post_id === parseInt(id))
}

module.exports = {
  Query: {
    authors,
    author,
    posts,
    post
  },
  Author: {
    posts: authorPosts
  },
  Post: {
    author: postAuthor,
    comments: postComments
  }
}
