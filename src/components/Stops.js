import React, {Component} from 'react';

export class Stops extends Component {
    componentWillMount() {
        this.stops = this.stops || [];
    }
    selectStops(stop) {
        console.log(stop);
        let d = document.querySelector('.stops');
        this.stops.push(stop.stop);
        d.innerHTML = this.stops;
    }
    render() {
        return (
            <div>
                <p>What Stops are you Making?</p>
                {this.props.stops.map((stop, ukey) => {
                    return (
                        <div key={ukey}>
                            <div key={ukey} onClick={(e) => this.selectStops(stop, e.target)}>{stop.stop}</div>
                        </div>
                    );
                })}
                <div className="stops"></div>
                <button onClick={() => this.props.submitStops(this.stops)}>Submit</button>
            </div>
        );
    }
}