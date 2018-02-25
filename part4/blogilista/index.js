const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')

mongoose
  .connect(process.env.MONGODB_URI)
  .then( () => {
    console.log('connected to database', process.env.MONGODB_URI)
  })
  .catch( err => {
    console.log(err)
  })

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)

const PORT = config.port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})