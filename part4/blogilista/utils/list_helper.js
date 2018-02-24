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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}