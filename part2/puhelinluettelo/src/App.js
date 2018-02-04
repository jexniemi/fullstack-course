import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas',
          number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filterValue: ''
    }
    this.addPerson = this.addPerson.bind(this)
  }

  addPerson = (e) => {
    e.preventDefault()
    for (var i = 0; i < this.state.persons.length; i++) {
      if (this.state.persons[i].name === this.state.newName) {
        alert("person is already on the list")
        this.setState({newName: '', newNumber: ''})
        return
      }
    }

    let newPersons = this.state.persons
    let newPerson = {name: this.state.newName, number: this.state.newNumber}
    newPersons.push(newPerson)
    this.setState({persons: newPersons, newName: '', newNumber: ''})
  }

  render() {
    let numerot = 
    this.state.filterValue ?
    this.state.persons.filter(person => person.name.includes(this.state.filterValue)).map((person, id) => (
    <p key={id}>{person.name} {" " + person.number}</p> ))
      : 
    (this.state.persons.map((person, id) => (
      <p key={id}>{person.name} {" " + person.number}</p>
    )))

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <br/>
        Rajaa näytettäviä
        <input value={this.state.filterValue} onChange={(e) => this.setState({filterValue: e.target.value})}/>
        <h2>Lisää uusi</h2>
        <form>
          <div>
            nimi: <input value={this.state.newName} onChange={(e) => this.setState({newName: e.target.value})}/>
            <br/>
            puhelin: <input value={this.state.newNumber} onChange={(e) => this.setState({newNumber: e.target.value})}/>
          </div>
          <div>
            <button type="submit" onClick={this.addPerson}>lisää</button>
          </div>
          <div>
            debug: {this.state.newName} <br/>
            numero: {this.state.newNumber} <br/>
          </div>
        </form>
        <h2>Numerot</h2>
        {numerot}
      </div>
    )
  }
}

export default App