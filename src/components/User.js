import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

import {Map} from './Map';
import {Filter} from './Filter';

export class User extends Component {
    componentWillMount() {
        this.setState({
            locations: null,
            gmapi: '',
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
            this.buildOptions(res);
        });
    }
    buildOptions(opts) {
        let keys = Object.keys(opts);
        let locations = this.props.options;
        
        this.locations = [];

        for (let k of keys) {
            let formattedStops = [];
            opts[k].stops.map((stop, incr) => {
                stop = JSON.parse(stop);
                formattedStops.push(stop);
            });
            this.gmapi = opts[k].gmapi;
            this.duration = opts[k].duration;
            this.distance = opts[k].distance;
            this.stopData = opts[k].stopData;

            let details = {};
            k = k.split('&');

            let orig;
            let depTime;
            let destination;
            k.map(ke => {
                ke.indexOf('dest') > -1 ? destination = ke.split('dest_')[1] : destination;
                ke.indexOf('origin') > -1 ? orig = ke.split('origin_')[1] : orig;
                ke.indexOf('depTime') > -1 ? depTime = ke.split('depTime_')[1] : depTime;
            });

            locations.map(loc => {
                orig == loc.map ? details['origin'] = loc.stop : orig;
                orig == loc.map ? details['departureTime'] = depTime : orig;
                orig == loc.map ? details['buid'] = k : orig;
                orig == loc.map ? details['originCoords'] = loc.coords : orig;
                destination == loc.map ? details['destination'] = loc.stop : orig;
                destination == loc.map ? details['destinationCoords'] = loc.coords : orig;
                destination == loc.map ? details['stops'] = formattedStops : details;
            });
            this.locations.push(details);
        }
        this.setState({
            locations: this.locations,
            stops: opts.stops,
            gmapi: this.gmapi,
            distance: this.distance,
            duration: this.duration,
            stopData: this.stopData,
        });
    }
    selectLocation(loc, el) {

        let divs = document.querySelectorAll('.selection');
        for (let div of divs) {
            div.style.border = '';
        }

        el.style.border = '1px solid black';
        this.setState({
            selected: loc
        });

    }
    submit() {
        this.setState({
            mapped: this.state.selected,
            gmapi: this.state.gmapi
        });
    }
    filtered(locs) {
        this.setState({
            locations: locs,
        })
    }
    render() {
        if (this.state.locations && !this.state.mapped) {
            return (
                <div>
                    <Filter locations={this.state.locations}
                            filtered={(locs) => this.filtered(locs)}/>
                    <ListGroup>
                        {this.state.locations.map((loc, incr) => {
                            return (
                                <ListGroupItem bsSize="large"
                                    className="selection"
                                    key={incr}
                                    onClick={(e) => this.selectLocation(loc, e.target)}>
                                    <h3 className="spaced">Origin: {loc.origin}</h3>
                                    <h4 className="spaced smaller">Destination: {loc.destination}</h4>
                                    <h4 className="spaced smaller">Departure Time: {loc.departureTime}</h4>
                                    <ul className="bullets spaced">Stops: 
                                        {loc.stops.map((stop, j) => {
                                            return (<li 
                                                        className="inline-block"
                                                        key={j}>{stop.stop}</li>)
                                        })}
                                    </ul>
                                </ListGroupItem>
                            );
                        })}
                        <button 
                            className="fixed-submit"
                            onClick={() => this.submit()}>Submit</button>
                    </ListGroup>
                </div>
            )
        } else if (this.state.mapped) {
            return <Map gmapi={this.state.gmapi} 
                        mapped={this.state.mapped}
                        distance={this.state.distance}
                        duration={this.state.duration}
                        stopData={this.state.stopData}/>
        } else {
            return (<div>Something went wrong</div>);
        }
    }
}