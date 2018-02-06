import React, {Component} from 'react';
import {Map} from './Map';

export class User extends Component {
    componentWillMount() {
        this.setState({
            locations: null
        })
    }
    componentDidMount() {
        fetch('/user', {
            method: 'post',
            body: {},
        })
        .then((res) => {
            return res.json();
        })
        .then((res) => {

        // stubbed 
        // let res = {
        //     'origin_1&depTime_6:25am&dest_5': {
        //         lat: 40.7507409,
        //         lng: -73.9820202
        //     }
        // }
        // end stubbed
            this.buildOptions(res);
        });
    }
    buildOptions(opts) {
        let keys = Object.keys(opts);
        let locations = this.props.options;

        this.locations = [];

        for (let k of keys) {
            let details = {};
            let orig = k.split('&')[0].split('origin_')[1];
            let depTime = k.split('&')[1].split('depTime_')[1];
            let destination = k.split('&')[2].split('dest_')[1];
            console.log('dest: ', destination);
            locations.map(loc => {
                orig == loc.map ? details['origin'] = loc.stop : orig;
                orig == loc.map ? details['departureTime'] = depTime : orig;
                orig == loc.map ? details['buid'] = k : orig;
                orig == loc.map ? details['originCoords'] = loc.coords : orig;
                destination == loc.map ? details['destination'] = loc.stop : orig;
                destination == loc.map ? details['destinationCoords'] = loc.coords : orig;
            });
            this.locations.push(details);
        }
        this.setState({
            locations: this.locations
        });
    }
    selectLocation(loc, el) {
        el.style.border = '10px solid black';
        this.setState({
            selected: loc
        });
    }
    submit() {
        this.setState({
            mapped: this.state.selected
        });
    }
    render() {
        if (this.state.locations && !this.state.mapped) {
            return (
                <div>
                    {this.state.locations.map((loc, incr) => {
                        return (
                            <div
                                className="border"
                                onClick={(e) =>
                                    this.selectLocation(loc, e.target)}
                                key={incr}>
                                <h3>Origin: {loc.origin}</h3>
                                <h4>Departure Time: {loc.departureTime}</h4>
                                <h4>Destination: {loc.destination}</h4>
                            </div>
                        );
                    })}
                    <button onClick={() => this.submit()}>Submit</button>
                </div>)
        } else if (this.state.mapped) {
            console.log(this.state);
            return <Map
                mapped={this.state.mapped} />
        } else {
            return (<div>Hey</div>);
        }
    }
}