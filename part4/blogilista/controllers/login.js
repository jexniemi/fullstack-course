const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')

const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

loginRouter.post('/', async (request, response) => {
    console.log(getTokenFrom(request))
  
    try {const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null ?
    false :
    await bcryptjs.compare(body.password, user.passwordHash)

  if ( !(user && passwordCorrect) ) {
    return response.status(401).send({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response.status(200).send({ token, username: user.username, name: user.name })
} catch (exception) {
    console.log(exception)
}
})

module.exports = loginRouter