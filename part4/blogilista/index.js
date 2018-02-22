const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')


mongoose
  .connect('mongodb://testuser:1234@ds247078.mlab.com:47078/bloglistfullstack')
  .then( () => {
    console.log('connected to database', 'mongodb://testuser:1234@ds247078.mlab.com:47078/bloglistfullstack')
  })
  .catch( err => {
    console.log(err)
  })

app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogsRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})