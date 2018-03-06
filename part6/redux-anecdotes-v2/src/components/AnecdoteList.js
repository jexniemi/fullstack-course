import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

class AnecdoteList extends React.Component {
  onClick = (anecdote) => {
    console.log(anecdote, 'called')
    this.props.store.dispatch(voteAnecdote(anecdote.id))
    this.props.store.dispatch(setNotification(`you voted ${anecdote.content}`))
  }

  render() {
    const anecdotes = this.props.store.getState().anecdotes.filter(anecdote => anecdote.content.includes(this.props.store.getState().filter))
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store}/>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.onClick(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
