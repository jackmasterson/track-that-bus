import React, {Component} from 'react';
import {Map} from './Map';

export class User extends Component {
    componentWillMount() {
        console.log(this.props);
    }
    render() {
        return (
            <Map
                destCoords={this.props.destination}
                lat={this.props.location.lat}
                lng={this.props.location.lng}
            />
        );
    }
}