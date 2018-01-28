import React from 'react';

export const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>
export const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>
export const Sisalto = (props) => {
    const osat = props.kurssi.osat.map((osa, id) => 
    <Osa key={id} osa={osa.nimi} tehtavia={osa.tehtavia} />)
    return (
        <div>
            {osat}
        </div>
    )
}

export const Kurssi = (props) => {
    return (
        <div>
            <Otsikko kurssi={props.kurssi} />
            <Sisalto kurssi={props.kurssi} />
            <Yhteensa kurssi={props.kurssi} />
        </div>
    )
}

export const Yhteensa = (props) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let tehtavat = []
    
    props.kurssi.osat.map(osa => tehtavat.push(osa.tehtavia))

    return (
        <p>yhteensä {tehtavat.reduce(reducer)} tehtävää</p>
    )
}