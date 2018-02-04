import React from 'react'
import axios from 'axios'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            filterValue: '',
            filteredCountries: []
        }

        this.filterCountries = this.filterCountries.bind(this)
        this.displayDetails = this.displayDetails.bind(this)
    }

    componentWillMount() {
        axios
            .get("https://restcountries.eu/rest/v2/all")
            .then(response => {
                this.setState({ countries: response.data })
            })
    }

    filterCountries = (e) => {
        let filtered = this.state.countries.filter(country => country.name.includes(e.target.value))
        this.setState({ filteredCountries: filtered, filterValue: e.target.value })
    }

    displayDetails = (e, country) => {
        this.setState({
            filteredCountries: [country],
            filterValue: country.name
        })
    }

    render() {
        let displayCountries;

        if (this.state.filterValue === '' || this.state.filteredCountries.length > 10) {
            displayCountries = (this.state.countries.map((country, id) => (
                <div key={id} onClick={(e) => this.displayDetails(e, country)}>
                    <p >{country.name}</p>
                </div>)
            ))
        } else if (this.state.filteredCountries.length > 1) {
            displayCountries = this.state.filteredCountries.map((country, id) =>
                <div key={id} onClick={(e) => this.displayDetails(e, country)}>
                    <p >{country.name}</p>
                </div>)
        } else if (this.state.filteredCountries.length === 1) {
            let country = this.state.filteredCountries[0]
            displayCountries =
                <div>
                    <h1>{country.name + " " + country.nativeName}</h1>
                    <p>capital: {country.capital}</p>
                    <p>population: {country.population}</p>
                    <img src={country.flag} alt="kuva"/>
                </div>
        }



        return (
            <div>
                find countries:
                <input
                    value={this.state.filterValue}
                    onChange={this.filterCountries}
                />
                {displayCountries}
            </div>
        )
    }
}