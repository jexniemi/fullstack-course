import React from 'react';
import Osa from './Osa';

class Sisalto extends React.Component {
    state = {  }

    render() {
        return (
            <div>
                <Osa osa={this.props.osat[0]}/>
                <Osa osa={this.props.osat[1]}/>
                <Osa osa={this.props.osat[2]}/>
            </div>
        );
    }
}
export default Sisalto;