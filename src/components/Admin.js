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
                submitLocation={(loc) => this.props.submitLocation(loc, 'origin')}
            />,
            destination: <Location
                locations={this.props.locations}
                type="destination"
                nextScene={() => this.nextScene()}
                submitLocation={(loc) => this.props.submitLocation(loc, 'destination')}
            />,
            departureTime: <DepartureTime
                type="departureTime"
                times={this.props.times}
                nextScene={() => this.nextScene()}
                submitTime={(time) => this.props.submitLocation(time, 'departureTime')}
            />,
            // stops: <Stops
            //     stops={this.props.locations}
            //     submitStops={(stops) => this.props.submitStops(stops)}
            // />,
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
            this.props.getLocation();
        }
    }
    render() {
                return (
                    <div className="admin-launch">
                        <h1>hello, {this.state.admin}</h1>
                            {(() => { return (this.display[this.state.display])})()}
                    </div>
                );
    }
}