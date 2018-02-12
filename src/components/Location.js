import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export class Location extends Component {
    render() {
        return (
            <div>
                {this.props.locations.map((location, incr) => {
                    return <Button 
                                key={incr}
                                onClick={() => this.props.submitLocation(location.direction)}>{location.direction}
                            </Button>
                })}
            </div>
        );
    }
}