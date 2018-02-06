import React, { Component } from 'react';
import {User} from './User';
import {Admin} from './Admin';

import {SelectionScreen} from './SelectionScreen';

export class Launch extends Component {
    componentWillMount() {
        this.setState({
            locations: [{
                stop: 'Port Authority',
                coords: { lat: 40.7568858, lng: -73.9931965 },
                map: 1,
            }, {
                stop: 'Cheesequake',
                coords: { lat: 40.4664835, lng: -74.2916424 },
                map: 2
            }, {
                stop: 'PNC',
                coords: { lat: 40.3853523, lng: -74.1848752 },
                map: 3
            }, {
                stop: 'Red Bank',
                coords: { lat: 40.3499661, lng: -74.0877706 },
                map: 4
            }, {
                stop: 'Monmouth',
                coords: { lat: 40.1983467, lng: -74.1013166 },
                map: 5
            }, {
                stop: 'Forked River',
                coords: { lat: 39.8741802, lng: -74.2168655 },
                map: 6
            }],
            times: [{
                time: '5:10am',
            }, {
                time: '5:45am',
            }, {
                time: '6:00am',
            }, {
                time: '6:25am',
            }]
        });
    }
    submitLocation(loc, type) {
        this.setState({
            [type]: loc,
        });
    }
    submitStops(stops) {
        this.setState({
            stops: stops,
        });
    }
    getLocation() {
        const options = {
            enableHighAccuracy: true,
            timeout: 450000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition((pos) => {
            this.success(pos);
        }, this.error, options);
    }
    success(pos) {
        let buid = '';
        let dest = this.state.destination.stop;
        let origin = this.state.origin.stop;
        let dep = this.state.departureTime;
        this.state.locations.map((loc) => {
            loc.stop === origin ? buid += `&origin_${loc.map}` : buid;
            loc.stop === dest ? buid += `&dest_${loc.map}` : buid;
            loc.stop === origin ? buid += `&depTime_${dep}` : buid;
        });
        console.log('buid: ', buid);
        let currentCoords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
        };
        fetch('/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentCoords, 
                buid,
            })
        })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            console.log('error is: ', err);
        });

        // bug
        this.timeout = setTimeout(() => {
            this.getLocation();
        }, 4500000);
        // end bug

        this.setState({
            sent: true,
        });
    };
    error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    render() {
        if (window.location.pathname === '/admin') {
            if (this.state.sent) {
                return (
                    <div>Coordinates sent!</div>
                )
            } else {
                return <Admin
                    submitLocation={(loc, type) => this.submitLocation(loc, type)}
                    submitStops={(stops) => this.submitStops(stops)}
                    locations={this.state.locations}
                    times={this.state.times}
                    getLocation={() => this.getLocation()}
                />
            }
        } else {
            return <User destination={this.state.selected}/>
        }
    }
}
