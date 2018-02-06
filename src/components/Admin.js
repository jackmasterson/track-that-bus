import React, {Component} from 'react';
import {Location} from './Location';
import {Stops} from './Stops';
import {DepartureTime} from './DepartureTime';

export class Admin extends Component {
    componentWillMount() {
        this.sceneTrack = 0;
        this.display = {
            origin: <Location
                type="origin"
                locations={this.props.locations}
                nextScene={() => this.nextScene()}
                submitLocation={(loc) => this.submitLocation(loc, 'origin')}
            />,
            destination: <Location
                locations={this.props.locations}
                type="destination"
                nextScene={() => this.nextScene()}
                submitLocation={(loc) => this.submitLocation(loc, 'destination')}
            />,
            departureTime: <DepartureTime
                type="departureTime"
                times={this.props.times}
                nextScene={() => this.nextScene()}
                submitTime={(time) => this.submitLocation(time, 'departureTime')}
            />, 
        }
        this.displayKeys = Object.keys(this.display);
        let display = this.displayKeys[this.sceneTrack];
        this.setState({
            currentCoords: {lat: 'pending', lng: 'pending'},
            admin: 'admin-one',
            display
        });
    }
    nextScene() {
        ++this.sceneTrack;
        this.setState({
            display: this.displayKeys[this.sceneTrack],
        });
        if (this.sceneTrack === this.displayKeys.length) {
            this.setState({
                displayStops: true,
            });
        }
    }
    submitLocation(loc, type) {
        this.setState({
            [type]: loc,
        });
        this.props.submitLocation(loc, type);
    }
    render() {
        console.log(this.state);
        if (this.state.displayStops) {
            return (
                <Stops
                    stops={this.props.locations}
                    origin={this.state.origin}
                    destination={this.state.destination}
                    handleStops={(stops) => this.props.handleStops(stops)}
                />
            )
        } else {
            return (
                <div className="admin-launch">
                    <h1>hello, {this.state.admin}</h1>
                    {(() => { return (this.display[this.state.display]) })()}
                </div>
            );
        }
    }
}