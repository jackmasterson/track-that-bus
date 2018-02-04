import React, { Component } from 'react';
import {User} from './User';
import {Admin} from './Admin';

import {SelectionScreen} from './SelectionScreen';

export class Launch extends Component {
    componentWillMount() {
        this.setState({
            destinations: [{
                stop: 'Port Authority',
                coords: { lat: 40.7568858, lng: -73.9931965 },
            }, {
                stop: 'Cheesequake',
                coords: { lat: 40.4664835, lng: -74.2916424 },
            }, {
                stop: 'PNC',
                coords: { lat: 40.3853523, lng: -74.1848752 },
            }, {
                stop: 'Red Bank',
                coords: { lat: 40.3499661, lng: -74.0877706 },
            }, {
                stop: 'Monmouth',
                coords: { lat: 40.1983467, lng: -74.1013166 },
            }, {
                stop: 'Forked River',
                coords: { lat: 39.8741802, lng: -74.2168655 },
            }],
        });
    }
    submitDestination(dest) {
        this.dest = dest;

        this.setState({
            selected: dest,
        });
    }
    submitStops(stops) {
        this.stops = stops;
        this.getLocation();

        this.setState({
            stops: stops,
        });
    }
    getLocation() {
        const options = {
            enableHighAccuracy: true,
            timeout: 45000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition((pos) => {
            this.success(pos);
        }, this.error, options);
    }
    success(pos) {
        let currentCoords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
        };
        fetch('/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({currentCoords, dest: this.dest, stops: this.stops}),
        })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            console.log('error is: ', err);
        });
        this.timeout = setTimeout(() => {
            this.getLocation();
        }, 45000);
        this.setState({
            sent: true,
            currentCoords: currentCoords,
        });
    };
    error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    render() {
        if (window.location.pathname === '/admin') {
            return <Admin
                        submitDestination={(dest) => this.submitDestination(dest)}
                        submitStops={(stops) => this.submitStops(stops)}
                        destinations={this.state.destinations}
                    />
        } else {
            return <User destination={this.state.selected}/>
        }
    }
}
