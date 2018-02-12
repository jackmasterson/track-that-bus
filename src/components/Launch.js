import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {User} from './User';
import {Admin} from './Admin';
import {Init} from './Init';

export class Launch extends Component {
    componentWillMount() {
        this.scene = this.scene || 0;
        this.setState({
            locations: [{
                stop: 'Port Authority',
                coords: { lat: 40.7568858, lng: -73.9931965 },
                map: 0,
            }, {
                stop: 'Cheesequake',
                coords: { lat: 40.4664835, lng: -74.2916424 },
                map: 1,
            }, {
                stop: 'PNC',
                coords: { lat: 40.3853523, lng: -74.1848752 },
                map: 2,
            }, {
                stop: 'Red Bank',
                coords: { lat: 40.3499661, lng: -74.0877706 },
                map: 3,
            }, {
                stop: 'Monmouth',
                coords: { lat: 40.1983467, lng: -74.1013166 },
                map: 4,
            }, {
                stop: 'Forked River',
                coords: { lat: 39.8741802, lng: -74.2168655 },
                map: 5,
            }],
            scene: this.scene,
            plannedStops: [],
            completed: false,
        });
    }
    submitLocation(loc) {
        this.setState({
            direction: loc,
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
        console.log('pos: ', pos);
        this.setState({
            sent: true,
        });
        fetch('/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                direction: this.state.direction,
                stops: this.state.plannedStops,
                data: JSON.stringify(this.locations),
                current: {lat: pos.coords.latitude, lng: pos.coords.longitude},
            })
        })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            console.log('error is: ', err);
        });
    };
    handleStops(stops) {
        this.setState({
            stops
        });
        this.getLocation();
    }
    nextScene() {
        this.setState({
            scene: ++this.scene,
        });
    }
    previousScene() {
        this.setState({
            scene: --this.scene,
        })
    }
    addStops(stop) {
        this.setState({
            plannedStops: [...this.state.plannedStops, stop]
        });
    }
    removeStops(stop) {
        this.setState({
            plannedStops: this.state.plannedStops.filter((plannedStop) => plannedStop !== stop)
        });
    }
    error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={() => {
                        return (
                            <Init />
                        )
                    }} />
                    <Route path="/driver" render={() => {
                        if (this.state.sent) {
                             return <div>Data sent!</div>
                        } else {
                            return (
                                <Admin
                                    submitLocation={(loc, type) => this.submitLocation(loc, type)}
                                    submitStops={(stops) => this.submitStops(stops)}
                                    locations={this.state.locations}
                                    times={this.state.times}
                                    getLocation={() => this.getLocation()}
                                    nextScene={() => this.nextScene()}
                                    previousScene={() => this.previousScene()}
                                    scene={this.state.scene}
                                    addStops={(stop) => this.addStops(stop)}
                                    removeStops={(stop) => this.removeStops(stop)}
                                    plannedStops={this.state.plannedStops}
                                    completed={this.state.completed}
                                    method={() => this.getLocation()}
                                />
                            )
                        }
                    }} />
                    <Route path="/passenger" render={() => {
                        return (
                            <User
                                options={this.state.locations} />
                        )
                    }} />
                </Switch>
            </Router>
        );
    }
}
