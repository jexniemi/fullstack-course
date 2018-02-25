const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
    return {
        id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.string,
        likes: blog.likes
    }
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
    
    // Blog
    //     .find({})
    //     .then(blogs => {
    //         response.json(blogs)
    //     })
})


blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body

   if (body.title === undefined) {
       return response.status(400).json({error: 'title is missing'})
   }

   const blog = new Blog({
       title: body.title,
       author: body.author,
       url: body.url,
       likes: 0
   })

   const savedBlog = await blog.save()
   response.json(formatBlog(savedBlog))
   
    // const blog = new Blog(request.body)

    // blog
    //     .save()
    //     .then(result => {
    //         response.status(201).json(result)
    //     })
} catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
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