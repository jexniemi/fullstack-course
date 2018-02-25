const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')
const tokenExtractor = require('./utils/tokenExtractor')

// Models
const Blog = require('./models/blog')

// Routers
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const config = require('./utils/config')

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to database', process.env.MONGODB_URI)
  })
  .catch(err => {
    console.log(err)
  })

app.use(tokenExtractor)
app.use(cors())
app.use(bodyParser.json())

// Use routes
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

// Sovelluksen käynnistäminen tapahtuu nyt server-muuttujassa olevan olion kautta
const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}