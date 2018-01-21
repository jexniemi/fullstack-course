import React from 'react';

class Osa extends React.Component {
    state = {  }
    render() {
        return (
            <p>{this.props.osa.nimi + " " + this.props.osa.tehtavia}</p>
        );
    }
}

export default Osa;