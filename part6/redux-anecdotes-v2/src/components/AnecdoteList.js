import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'


class AnecdoteList extends React.Component {
  onClick = (anecdote) => {
    console.log(anecdote, 'called')
    this.props.voteAnecdote(anecdote.id)
    this.props.setNotification(`you voted ${anecdote.content}`)
  }

  render() {
    console.log(this.props.anecdotes)
    const anecdotes = this.props.anecdotes.filter(anecdote => anecdote.content.includes(this.props.filter))
    console.log(anecdotes)
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
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


const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList
