import React, {Component} from 'react';

export class SelectionScreen extends Component {
    render() {
        return (
            <div>
                <div><h2>Destinations</h2>
                    {this.options.destinations.map((dest, incr) => {
                        return (
                            <div key={incr} onClick={() => this.props.selectDestination(dest)}>{dest.dest}</div>
                        );
                    })}
                </div>
            </div>
        );
    }
}