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
    render() {
        return (
            <div>
                <p>Where would you like to go?</p>
                {this.props.destinations.map((dest, ukey) => {
                    return (
                        <div className="selection" key={ukey} onClick={(e) => this.selectDestination(dest, e.target)}>{dest.stop}</div>
                    );
                })}
                <button onClick={() => this.props.submitDestination(this.state.destination)}>Submit</button>
            </div>
        );
    }
}