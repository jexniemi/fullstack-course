const mongoose = require('mongoose')

const url = 'mongodb://testuser:1234@ds247078.mlab.com:47078/bloglistfullstack'

mongoose.connect(url)

const Blog = mongoose.model('Blog', {
    title: String,
    author: String,
    url: String,
    likes: Number
  })

  module.exports = Blog