import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            anecdotes: [
                {
                    text: "If it hurts, do it more often",
                    votes: 0
                },
                {
                    text: 'Adding manpower to a late software project makes it later!',
                    votes: 0
                },
                {
                    text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
                    votes: 0
                },
                {
                    text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
                    votes: 0
                },
                {
                    text: 'Premature optimization is the root of all evil.',
                    votes: 0
                },
                {
                    text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
                    votes: 0
                }
            ],
            mostVoted: {
                text: "",
                votes: 0
            }
        }
        this.calculateVotes = this.calculateVotes.bind(this);
    }

    calculateVotes = () => {
        const apuAnecdotes = this.state.anecdotes;
        let mostVotes = 0;
        let mostVotesIndex;
        for (var i = 0; i < apuAnecdotes.length; i++) {
            if (apuAnecdotes[i].votes > mostVotes) {
                mostVotes = apuAnecdotes[i].votes;
                mostVotesIndex = i;   
            }
        }

        this.setState({ mostVoted: this.state.anecdotes[mostVotesIndex]})   
    }

    render() {
        var mostVotedPrint = (
                <div>
                    <h2>anecdote with most votes:</h2>
                    <p>{this.state.mostVoted.text}</p>
                    <p>has {this.state.mostVoted.votes} votes</p>
                </div>
            )
        

        return (
            <div>
                {this.state.anecdotes[this.state.selected].text}
                <button
                    onClick={() => {
                        var newAnecdotes = this.state.anecdotes;
                        newAnecdotes[this.state.selected].votes++;
                        this.calculateVotes();
                        this.setState({ anecdotes: newAnecdotes })
                    }}
                >vote</button>
                <button
                    onClick={() => {
                        this.setState({ selected: Math.floor(Math.random() * 5) })
                    }}
                >next anecdote</button>

                {mostVotedPrint}
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)