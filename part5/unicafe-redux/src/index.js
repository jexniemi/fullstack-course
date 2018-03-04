import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducers/counterReducer'

const store = createStore(counterReducer)


const Statistiikka = () => {
    const currentState = store.getState();
    let palautteita = 0
    Object.keys(currentState).forEach((key) => palautteita += currentState[key]);

    const average = () => {
        let average = 0;
        Object.keys(currentState).forEach((key) => {
            if (key === 'good') {
                average += currentState.good
            } else if (key === 'bad') {
                average -= currentState.bad
            }
        })
        return average / palautteita
      }
    
      const positives = () => {
        const { good, ok, bad } = currentState;
        const result = Math.round(((good / (good + ok + bad)) * 100) * 100) / 100;
        return result + '%';
      }

    if (palautteita === 0) {
        return (
            <div>
                <h2>statistiikka</h2>
                <div>ei yhtään palautetta annettu</div>
            </div>
        )
    }

    return (
        <div>
            <h2>statistiikka</h2>
            <table>
                <tbody>
                    <tr>
                        <td>hyvä</td>
                        <td>{currentState.good}</td>
                    </tr>
                    <tr>
                        <td>neutraali</td>
                        <td>{currentState.ok}</td>
                    </tr>
                    <tr>
                        <td>huono</td>
                        <td>{currentState.bad}</td>
                    </tr>
                    <tr>
                        <td>keskiarvo</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>positiivisia</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>keskiarvo</td>
                        <td> {average()} </td>
                    </tr>
                    <tr>
                        <td>positiivisia</td>
                        <td> {positives()} </td>
                    </tr>
                </tbody>
            </table>

            <button onClick={() => store.dispatch({ type: 'ZERO' })}>nollaa tilasto</button>
        </div >
    )
}

class App extends React.Component {
    klik = (nappi) => () => {
        store.dispatch({ type: nappi });
    }

    render() {
        return (
            <div>
                <h2>anna palautetta</h2>
                <button onClick={this.klik('GOOD')}>hyvä</button>
                <button onClick={this.klik('OK')}>neutraali</button>
                <button onClick={this.klik('BAD')}>huono</button>
                <Statistiikka />
            </div>
        )
    }
}

const render = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
}

render()
store.subscribe(render)