const allAuthors = require('../data/authors.json')
const allPosts = require('../data/posts.json')
const allComments = require('../data/comments.json')

module.exports = {
  Query: {
    authors: () => allAuthors,
    author: (_, { id }) => allAuthors.find(a => a.id === parseInt(id)),
    posts: () => allPosts,
    post: (_, { id }) => allPosts.find(p => p.id === parseInt(id))
  },
  Author: {
    posts: author => allPosts.filter(p => p.author_id === parseInt(author.id))
  },
  Post: {
    author: post => allAuthors.find(a => a.id === parseInt(post.author_id)),
    comments: post => allComments.filter(c => c.post_id === parseInt(post.id))
  }
}
