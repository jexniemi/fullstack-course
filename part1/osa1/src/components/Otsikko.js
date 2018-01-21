import React from 'react';

class Otsikko extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    } 

    render() {
       return (
            <h1>{this.props.kurssi}</h1>
       )
    }
}

export default Otsikko;