import React from 'react'
import ReactDOM from 'react-dom'
import Osa from './components/Osa'
import Yhteensa from './components/Yhteensa';
import Otsikko from './components/Otsikko'
import Sisalto from './components/Sisalto'

const App = () => {
  const kurssi = {
  nimi: 'Half Stack -sovelluskehitys',
  osat: [
    {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    },
    {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    },
    {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }
  ]
}

  return (
    <div>
      <Otsikko kurssi={kurssi.nimi}></Otsikko>
      <Sisalto osat={kurssi.osat}/>
      <Yhteensa />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
