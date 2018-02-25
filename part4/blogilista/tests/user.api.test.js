const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')

const initialUsers = [
    {
        username: "newUser",
        password: "asd",
        name: "Batman",
        adult: false
      }
]

beforeAll(async () => {
    await User.remove({})
    console.log('cleared')

    const userObjects = initialUsers.map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
    console.log('done')
})

test('If user exists, respond 400', async () => {
    const newUser = {
        username: "newUser",
        password: "asd",
        name: "Batman",
        adult: false
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

})

test('If password has less than 3 char, respond 400', async () => {
    const newUser = {
        username: "asdawd",
        password: "de",
        name: "Hello World",
        adult: false
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    
})

afterAll(() => {
    console.log("Closing server")
    server.close()
})