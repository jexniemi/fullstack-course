import React from 'react'
import ReactDOM from 'react-dom'
import {Kurssi, Yhteensa, Osa, Otsikko, Sisalto} from './components/Kurssi'

const App = () => {
    const kurssit = [
      {
        nimi: 'Half Stack -sovelluskehitys',
        id: 1,
        osat: [
          {
            nimi: 'Reactin perusteet',
            tehtavia: 10,
            id: 1
          },
          {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7,
            id: 2
          },
          {
            nimi: 'Komponenttien tila',
            tehtavia: 14,
            id: 3
          }
        ]
      },
      {
        nimi: 'Node.js',
        id: 2,
        osat: [
          {
            nimi: 'Routing',
            tehtavia: 3,
            id: 1
          },
          {
            nimi: 'Middlewaret',
            tehtavia: 7,
            id: 2
          }
        ]
      }
    ]

    let kursseja = kurssit.map((kurssi, id) => (
        <Kurssi key={id} kurssi={kurssi}/>
    ))
    
    return (
        <div>
            {kursseja}
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)