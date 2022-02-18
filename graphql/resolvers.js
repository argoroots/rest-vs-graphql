const moment = require('moment')

const allAuthors = require('../data/authors.json')
const allPosts = require('../data/posts.json')
const allComments = require('../data/comments.json')

function authors (obj, args) {
  if (args.status) {
    return allAuthors.filter(a => a.status === args.status)
  } else {
    return allAuthors
  }
}

function author (obj, args) {
  return allAuthors.find(a => a.id === parseInt(args.id))
}

function posts () {
  return allPosts
}

function post (obj, args) {
  return allPosts.find(p => p.id === parseInt(args.id))
}

function submitPost (obj, args) {
  const author = allAuthors.find(a => a.id === parseInt(args.author_id))

  if (!author) {
    throw new Error(`Couldn't find author with id ${args.author_id}`)
  }

  const post = {
    id: allPosts.length + 1,
    author_id: author.id,
    created_at: new Date().toISOString(),
    title: args.title,
    body: args.body
  }

  allPosts.push(post)

  return post
}

function submitComment (obj, args, { pubsub }) {
  const post = allPosts.find(a => a.id === parseInt(args.post_id))

  if (!post) {
    throw new Error(`Couldn't find post with id ${args.post_id}`)
  }

  const comment = {
    id: allComments.length + 1,
    post_id: post.id,
    created_at: new Date().toISOString(),
    author: args.author,
    body: args.body
  }

  allComments.push(comment)

  pubsub.publish('commentAdded', {
    commentAdded: comment
  })

  return comment
}

function authorPosts (author) {
  return allPosts.filter(p => p.author_id === parseInt(author.id))
}

function postAuthor (post) {
  return allAuthors.find(a => a.id === parseInt(post.author_id))
}

function postComments (post) {
  return allComments.filter(c => c.post_id === parseInt(post.id))
}

function postCreatedAt (post, args) {
  return moment(post.created_at).format(args.format)
}

module.exports = {
  Query: {
    authors,
    author,
    posts,
    post
  },
  Mutation: {
    submitPost,
    submitComment
  },
  Subscription: {
    commentAdded: {
      subscribe (parent, args, { pubsub }) {
        return pubsub.asyncIterator('commentAdded')
      }
    }
  },
  Author: {
    posts: authorPosts
  },
  Post: {
    author: postAuthor,
    comments: postComments,
    created_at: postCreatedAt
  }
}
