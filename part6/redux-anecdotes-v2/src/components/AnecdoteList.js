import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'


class AnecdoteList extends React.Component {
  onClick = async (anecdote) => {
    console.log(anecdote, 'called')
    const updated = await anecdoteService.update( anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
    this.props.voteAnecdote(anecdote.id)
    this.props.setNotification(`you voted ${anecdote.content}`)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.orderedFilteredAnecdotes.map(anecdote =>
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

const orderedAndFiltered = (anecdotes, filter) => {
  const theAnecdotes = anecdotes.filter(anecdote => anecdote.content.includes(filter))
  return theAnecdotes.sort((a, b) => b.votes - a.votes)
}


const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    orderedFilteredAnecdotes: orderedAndFiltered(state.anecdotes, state.filter)
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList
