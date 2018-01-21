import React from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
    return (
        <button onClick={props.onclick}>{props.name}</button>
    )
}

const Statistic = (props) => {
    let tuloste;
    if (props.field.name === "positiivisia") {
        tuloste = (<tr><td>{props.field.name}</td><td>{props.field.counter+"%"}</td></tr>)
    } else {
        tuloste = (<tr><td>{props.field.name}</td><td>{props.field.counter}</td></tr>)
    }

    return (
        <tbody>{tuloste}</tbody>
    )

}

const Statistics = (props) => {
    const tilastot = props.tilastot.map((rivi, id) =>
        <Statistic key={id} field={rivi} />
    )

    return (
        <div>
            <table>
            {tilastot}
            <Statistic field={props.keskiarvo} />
            <Statistic field={props.positiivisia} />
            </table>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tilastot: [
                {
                    name: "hyvä",
                    counter: 0
                },
                {
                    name: "neutraali",
                    counter: 0
                },
                {
                    name: "huono",
                    counter: 0
                }
            ],
            keskiarvo: {
                name: "keskiarvo",
                counter: 0
            },
            positiivisia: {
                name: "positiivisia",
                counter: 0,
                merkki: " %"
            },
            klikkauksia: 0
        }
        this.laskeStatistiikka = this.laskeStatistiikka.bind(this)
    }

    laskeStatistiikka = () => {
        var uusiaKlikkauksia = this.state.klikkauksia + 1;
        var uusiPositiivisia = this.state.positiivisia;
        var keskiarvo = 0;
        const apuTilastot = this.state.tilastot;
        for (var i = 0; i < apuTilastot.length; i++) {
            if (apuTilastot[i].name === "hyvä") {
                keskiarvo += apuTilastot[i].counter
                uusiPositiivisia.counter = Math.round(apuTilastot[i].counter / uusiaKlikkauksia * 100);
            } else if (apuTilastot[i].name === "huono") {
                keskiarvo -= apuTilastot[i].counter;      
            }
        }
        

        keskiarvo = keskiarvo / uusiaKlikkauksia;
        const uusiKeskiarvo = this.state.keskiarvo;
        uusiKeskiarvo.counter = keskiarvo;
        this.setState({
            keskiarvo: uusiKeskiarvo,
            klikkauksia: uusiaKlikkauksia,
            positiivisa: uusiPositiivisia})
    }

    render() {
        const buttons = this.state.tilastot.map((rivi, id) =>
            <Button
                name={rivi.name}
                key={id}
                onclick={() => {
                    const newValue = this.state.tilastot[id].counter + 1;
                    const newTilastot = this.state.tilastot;
                    newTilastot[id].counter = newValue;

                    this.setState({ 
                        tilastot: newTilastot
                        })
                    this.laskeStatistiikka();
                }} />
        )

        let statistiikka;
        if (this.state.klikkauksia === 0) {
            statistiikka = <p>ei yhtään palautetta annettu</p>
        } else {
            statistiikka = (
                <div>
                <h2>statistiikka</h2>
                <Statistics 
                tilastot={this.state.tilastot} 
                keskiarvo={this.state.keskiarvo}
                positiivisia={this.state.positiivisia}/>
                </div>
            )
        }

        return (
            <div>
                <h2>anna palautetta</h2>
                {buttons}
                {statistiikka}
            </div>
        )
    }
}



ReactDOM.render(<App />, document.getElementById('root'));
