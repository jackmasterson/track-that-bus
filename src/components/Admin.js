import React, {Component} from 'react';
import {Destination} from './Destination';
import {Stops} from './Stops';

export class Admin extends Component {
    componentWillMount() {
        this.setState({
            currentCoords: [{ lat: 'pending', lng: 'pending' }],
            admin: 'admin-one',
        });
    }
    render() {
        console.log(this.state);
        return this.state.currentCoords.map((coord, k) => {
            return (
                <div key={k}>
                    <h1>hello, {this.state.admin}</h1>
                    <Destination 
                        destinations={this.props.destinations}
                        submitDestination={(dest) => this.props.submitDestination(dest)}
                    />
                    <Stops 
                        stops={this.props.destinations}
                        submitStops={(stops) => this.props.submitStops(stops)}
                    />
                </div>
            );
        });
    }
}