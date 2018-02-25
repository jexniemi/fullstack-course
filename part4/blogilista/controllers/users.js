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
        .populate('blogs', {_id: 1, title: 1, author: 1})
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

usersRouter.put('/:id', async (request, response) => {
    const body = request.body
    const user = formatUser(body)

    try {
        const result = await User.findByIdAndUpdate(request.params.id, user)
        response.status(204).end()
    } catch (exception) {
        response.status(400).send({ error: 'malformatted id' })
    }
})

module.exports = usersRouter