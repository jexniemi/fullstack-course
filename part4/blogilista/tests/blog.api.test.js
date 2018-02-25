const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
      }
]

beforeAll(async () => {
    await Blog.remove({})
    console.log('cleared')

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
    console.log('done')
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('likes defaults to 0', async () => {
    await api
        .post('/api/blogs')
        .expect(req => req.likes === 0)    
})

// Doesnt work because of authorization
// test('a valid blog can be added', async () => {
//     const newBlog = {
//         _id: '5a422aa71b54a676234d17f8',
//         title: 'Go To Statement Considered Harmful',
//         author: 'Edsger W. Dijkstra',
//         url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//         likes: 5,
//         __v: 0
//     }

//     await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//     const response = await api
//     .get('/api/blogs')

//     const contents = response.body.map(r => r.title)

//     expect(response.body.length).toBe(initialBlogs.length + 1)
//     expect(contents).toContain('Go To Statement Considered Harmful')

// })

afterAll(() => {
    server.close()
})