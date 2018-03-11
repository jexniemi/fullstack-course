import axios from 'axios'

const getAll = async () => {
    const response = await axios.get('http://localhost:3001/anecdotes')
    return response.data
}

const createNew = async (content) => {
    const response = await axios.post('http://localhost:3001/anecdotes', {  content, votes: 0 })
    return response.data
}

export default { getAll, createNew }