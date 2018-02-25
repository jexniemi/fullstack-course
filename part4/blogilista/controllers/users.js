const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')


const formatUser = (user) => {
    return {
        id: user._id,
        username: user.username,
        passwordHash: user.passwordHash,
        name: user.name,
        adult: user.adult,
        blogs: user.blogs
    }
}

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs')
    response.json(users.map(formatUser))
})

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        const saltRounds = 10
        const passwordHash = await bcryptjs.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            adult: body.adult,
            passwordHash,
            blogs: body.blogs
        })

        const savedUser = await user.save()

        response.json(savedUser)
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong'})
    }
})

module.exports = usersRouter