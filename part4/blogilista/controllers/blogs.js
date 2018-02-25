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
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        if (body.title === undefined) {
            return response.status(400).json({ error: 'title is missing' })
        }

        const user = await User.findById(body.user)

        const likes = body.likes > 0 ? body.likes : 0

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: likes,
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
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).json({ error: exception.message })
        } else {
            console.log(exception)
            response.status(500).json({ error: 'something went wrong...' })
        }
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = Blog.format(body)

    try {
        const result = await Blog.findByIdAndUpdate(request.params.id, blog)
        response.status(204).end()
    } catch (exception) {
        response.status(400).send({ error: 'malformatted id' })
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    if (request.token) {
        try {
            const blog = await Blog.findById(request.params.id)
            const decodedToken = jwt.verify(request.token, process.env.SECRET)
            if (decodedToken.id === blog.user.toString()){
                const result = await Blog.findByIdAndRemove(request.params.id)
                console.log(result)
                response.status(204).end()
            } else {
                console.log("This user is not authorized to remove this blog")
                response.status(401).json({ error: "This user is not authorized to remove this blog" }).end()
            }
            
        } catch (exception) {
            response.status(400).send({ error: 'malformatted id' })
        }
    } else {
        response.status(401).json({ error: "Missing authorization token" }).end()
    }

    // Works as well:
    // try {
    //     const result = await Blog.findByIdAndRemove(request.params.id)
    //     response.status(204).end()
    // } catch (exception) {
    //     console.log(exception)
    //     response.status(400).end({ error: 'malformatted id' })
    // }
})

module.exports = blogsRouter