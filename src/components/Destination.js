import React, {Component} from 'react';

export class Destination extends Component {
    selectDestination(dest, div) {
        let divs = document.querySelectorAll('.selection');
        for (let div of divs) {
            div.style.border = '';
        }
        div.style.border = '1px solid black';
        this.setState({
            destination: dest
        })
    }
    submitDestination(dest) {
        this.props.submitDestination(dest);
        this.props.displayStops(true);
    }
    render() {
        return (
            <div>
                <p>What is your end destination?</p>
                {this.props.destinations.map((dest, ukey) => {
                    return (
                        <div className="selection" key={ukey} onClick={(e) => this.selectDestination(dest, e.target)}>{dest.stop}</div>
                    );
                })}
                <button onClick={() => this.submitDestination(this.state.destination)}>Submit</button>
            </div>
        );
    }
}