// const anecdotesAtStart = [
// 'If it hurts, do it more often',
// 'Adding manpower to a late software project makes it later!',
// 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
// 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
// 'Premature optimization is the root of all evil.',
// 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

import anecdotesService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}

const anecdoteReducer = (store = [], action) => {
  if (action.type === 'VOTE') {
    const old = store.filter(a => a.id !== action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes + 1 }]
  }
  if (action.type === 'CREATE') {
    console.log('CREATE', action)
    return [...store, { content: action.data.content, id: getId(), votes: 0 }]
  }
  if (action.type === 'INIT_ANECDOTES') {
    return action.data
  }

  return store
}

// export const voteAnecdote = (id) => {
//   return {
//     type: 'VOTE',
//     id: id
//   }
// }

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdotesService.update(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'VOTE',
      ...votedAnecdote
    })
  }
}

// export const createAnecdote = (content) => {
//   return {
//     type: 'CREATE',
//     ...asObject(content)
//   }
// }

// WITH REDUX-THUNK:
export const createAnecdote = (content) => {
  return async (dispatch) => {
    let newAnecdote = await anecdotesService.createNew(content)
    console.log('creating new anecdote:', newAnecdote)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    console.log('initializing anecdotes', anecdotes)
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer