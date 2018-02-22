import React from 'react';
import peopleService from './services/peopleService'
import './App.css'

const Notification = ({ message }) => {
  if (message === null || message === '') {
    return null
  }
  return (
    <div className="message">
      {message}
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        {
          name: 'Arto Hellas',
          number: '040-123456'
        }
      ],
      filteredPersons: [],
      newName: '',
      newNumber: '',
      filterValue: '',
      message: ''
    }
    this.addPerson = this.addPerson.bind(this)
    this.filterPersons = this.filterPersons.bind(this)
    this.removePerson = this.removePerson.bind(this)
  }

  componentWillMount() {
    peopleService.getAll()
      .then(response => {
        this.setState({ persons: response.data })
        this.state.persons.forEach(person => console.log(person.id))
      })
  }

  addPerson = (e) => {
    e.preventDefault()
    var found = false
    for (var i = 0; i < this.state.persons.length; i++) {
      if (this.state.persons[i].name === this.state.newName) {
        console.log(this.state.persons[i].id)
        found = true;
        let xid = this.state.persons[i].id
        if (window.confirm(this.state.persons[i].name + " on jo luettelossa, korvataanko vanha numero uudella?")) {
          let newPersons = this.state.persons
          let newPerson = { name: this.state.persons[i].name, number: this.state.newNumber }
          newPersons[i] = newPerson
          peopleService.update(xid, newPerson)
          console.log(this.state.persons[i].id)
          this.setState({newName: '', newNumber: '', message: 'person updated'})
          setTimeout(() => {
            this.setState({message: null})
          }, 5000)
          return
        }  
      }
    }

    if (found === false) {

    let newPersons = this.state.persons
    let newPerson = { name: this.state.newName, number: this.state.newNumber }
    newPersons.push(newPerson)
    peopleService.create(newPerson)
    this.setState({ persons: newPersons, newName: '', newNumber: '', message: 'person added' })
    setTimeout(() => {
      this.setState({message: null})
    }, 5000)
  }
  }

  filterPersons = (e) => {
    let newFilteredCountries = this.state.persons.filter(person => person.name.includes(e.target.value))
    this.setState({
      filterValue: e.target.value,
      filteredCountries: newFilteredCountries
    })
  }

  removePerson = (id) => {
    if (window.confirm("Do you really want to delete this person?")) {
    peopleService.remove(id)
    .then(response => {
      console.log('success!')
      peopleService.getAll()
      .then(response => {
      this.setState({ persons: response.data, message: 'person removed' })
      setTimeout(() => {
        this.setState({message: null})
      }, 5000)
    })
    })
    .catch(error => {
      console.log('fail')
    })   
  }
  }

  render() {
    let Numerot = () => (
      this.state.filterValue ?
        this.state.filteredCountries.map((person, id) => (
          <div>
            <p key={id}>{person.name} {" " + person.number}</p>
          </div>
        ))
        :
        (this.state.persons.map((person, id) => (
          <div key={id}>
          <p>{person.name} {" " + person.number}</p>
          <button onClick={() => this.removePerson(person.id)}>DELETE</button>
          </div>
        ))))

    return (
      <div>
        <Notification message={this.state.message}/>
        <h2>Puhelinluettelo</h2>
        <br />
        Rajaa näytettäviä
        <input value={this.state.filterValue} onChange={this.filterPersons} />
        <h2>Lisää uusi</h2>
        <form>
          <div>
            nimi: <input value={this.state.newName} onChange={(e) => this.setState({ newName: e.target.value })} />
            <br />
            puhelin: <input value={this.state.newNumber} onChange={(e) => this.setState({ newNumber: e.target.value })} />
          </div>
          <div>
            <button type="submit" onClick={this.addPerson}>lisää</button>
          </div>
          <div>
            debug nimi: {this.state.newName} <br />
            debug numero: {this.state.newNumber} <br />
          </div>
        </form>
        <h2>Numerot</h2>
        <Numerot />
      </div>
    )
  }
}

export default App