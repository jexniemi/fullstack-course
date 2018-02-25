
const tokenExtractor = (request, response, next) => {
    const auth = request.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        request.token = auth.split(' ')[1]
    }
    next()
}

module.exports = tokenExtractor