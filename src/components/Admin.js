import React, {Component} from 'react';
import {Destination} from './Destination';
import {Stops} from './Stops';

export class Admin extends Component {
    componentWillMount() {
        this.setState({
            currentCoords: [{ lat: 'pending', lng: 'pending' }],
            admin: 'admin-one',
            displayStops: false,
        });
    }
    displayStops(bool) {
        this.setState({
            displayStops: bool,
        });
    }
    render() {
        if (!this.state.displayStops) {
            return this.state.currentCoords.map((coord, k) => {
                return (
                    <div className="admin-launch" key={k}>
                        <h1>hello, {this.state.admin}</h1>
                        <Destination
                            destinations={this.props.destinations}
                            submitDestination={(dest) => this.props.submitDestination(dest)}
                            displayStops={(bool) => this.displayStops(bool)}
                        />
                    </div>
                );
            });
        }

        else {
            return this.state.currentCoords.map((coord, k) => {
                return (
                    <div className="admin-launch" key={k}>
                        <h1>hello, {this.state.admin}</h1>

                        <Stops
                            display={this.state.displayStops}
                            stops={this.props.destinations}
                            submitStops={(stops) => this.props.submitStops(stops)}
                        />
                    </div>
                );
            });
        }
    }
}