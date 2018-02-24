const listHelper = require('../utils/list_helper.js');
const mockBlogs = require('./mockBlogs')

test('dummy is called', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1);
})

describe('total likes', () => {

    test('when list has only one blog equals that likes of that', () => {
        const result = listHelper.totalLikes(mockBlogs.listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has many blogs equals that likes of all', () => {
        const result = listHelper.totalLikes(mockBlogs.listWithManyBlogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
    test('when list has only one blog return that', () => {
        const result = listHelper.favoriteBlog(mockBlogs.listWithOneBlog)
        expect(result).toEqual(mockBlogs.listWithOneBlog[0])
    })

    test('when list has many blogs return the one with most likes', () => {
        const result = listHelper.favoriteBlog(mockBlogs.listWithManyBlogs)
        expect(result).toEqual(mockBlogs.listWithManyBlogs[2])
    })
})