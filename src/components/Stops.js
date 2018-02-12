import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export class Stops extends Component {
    render() {
       return( 
            <div>
                {this.props.locations.map((location, incr) => {
                        <p>Select All Planned Stops</p>
                        return <div key={incr}>
                                <p>{location.direction}:</p>
                                {location.stops.map((stop, k) => {
                                    return <Button 
                                                onClick={() => this.props.addStops(stop)}
                                                key={k}>{stop}</Button>
                                })}
                            </div>
                    })
                }
                {this.props.plannedStops().map((stop, incr) => {
                    return (
                        <div 
                            className="selected-stops"
                            onClick={() => this.props.removeStops(stop)}
                            key={incr}>{stop}[x]</div>
                    );
                })}
            </div>
       )
    }
}