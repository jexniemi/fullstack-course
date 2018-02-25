const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    let likes = 0;
    
    blogs.forEach((blog) => {
        likes += blog.likes
    })

    return likes
}

const favoriteBlog = (blogs) => {
    let mostPopular = {
        likes: 0
    }

    blogs.forEach((blog) => {
        if (blog.likes >= mostPopular.likes) {
            mostPopular = blog
        }
    })

    return mostPopular
}

const getAllBlogs = (blogs, author) => {
    return blogs.filter(blog => {
        return blog.author === author
    })
}

const getNumberOfBlogs = (blogs, author) => {
    return {
        author: author,
        blogs: getAllBlogs(blogs, author).length
    }
}

const mostBlogs = (blogs) => {
    return blogs.reduce((top, blog) => {
        const authorsBlogs = getNumberOfBlogs(blogs, blog.author)
        return top.blogs < authorsBlogs.blogs ? authorsBlogs : top  
    }, getNumberOfBlogs(blogs, blogs[0].author))
}

const mostLikes = (blogs) => {
    return blogs.reduce((top, blog) => {
        const authorsLikes = getLikesCount(blogs, blog.author)
        return top.likes < authorsLikes.likes ? authorsLikes : top  
    }, getLikesCount(blogs, blogs[0].author))
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}