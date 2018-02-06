import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export class Stops extends Component {
    componentWillMount() {
        this.origin = this.props.origin;
        this.destination = this.props.destination;
        this.stops = this.props.stops;

        this.getStops();
    }
    getStops() {
        this.tracks = [];
        this.stops.map((stop) => {
            stop.map > this.origin.map && stop.map < this.destination.map ||
            stop.map < this.origin.map && stop.map > this.destination.map ?
                this.tracks.push(JSON.stringify(stop)) : stop;
        });

        this.setState({
            tracks: this.tracks,
        })
    }
    removeStop(track) {
        this.tracks = this.tracks.filter((tr) => tr !== JSON.stringify(track) );

        this.setState({
            tracks: this.tracks,
        })
    }
    render() {
        if (this.state.tracks.length > 0) {
            return (
                <div className="launch-div">
                    <div> Click to remove all extra stops:
                    {this.state.tracks.map((track, incr) => {
                        track = JSON.parse(track);
                            return (
                                <Button key={incr} 
                                     onClick={() => this.removeStop(track)}>
                                     {track.stop}
                                </Button>
                            )
                        })}
                    </div>
                    <button onClick={() => this.props.handleStops(this.state.tracks)}>Submit</button>
                </div>
            );
        } else {
            return (
                <div className="launch-div">
                    <button onClick={() => this.props.handleStops(this.state.tracks)}>Submit</button>
                </div>
            )
        }
    }
}