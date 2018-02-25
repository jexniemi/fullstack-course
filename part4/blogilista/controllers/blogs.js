const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user')
    response.json(blogs)


    // Blog
    //     .find({})
    //     .then(blogs => {
    //         response.json(blogs)
    //     })
})


blogsRouter.post('/', async (request, response) => {
    const body = request.body

    try {
        const token = getTokenFrom(request)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
          }

        if (body.title === undefined) {
            return response.status(400).json({ error: 'title is missing' })
        }

        const user = await User.findById(body.user)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: 0,
            user: user._id
        })

        const savedBlog = await blog.save()
        response.json(Blog.format(savedBlog))

        // const blog = new Blog(request.body)

        // blog
        //     .save()
        //     .then(result => {
        //         response.status(201).json(result)
        //     })
    } catch (exception) {
        if (exception.name === 'JsonWebTokenError' ) {
            response.status(401).json({ error: exception.message })
          } else {
            console.log(exception)
            response.status(500).json({ error: 'something went wrong...' })
          }
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        const result = await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        console.log(exception)
        response.status(400).end({ error: 'malformatted id' })
    }



    // WORKS:
    // Blog
    //     .findByIdAndRemove(request.params.id)
    //     .then(result => {
    //         response.status(204).end()
    //     })
    //     .catch((error) => {
    //         response.status(400).end({ error: 'malformatted id' })
    //     })
})

module.exports = blogsRouter