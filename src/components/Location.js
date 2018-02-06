import React, {Component} from 'react';

export class Location extends Component {
    selectLocation(loc, div) {
        let divs = document.querySelectorAll('.selection');
        for (let div of divs) {
            div.style.border = '';
        }
        div.style.border = '1px solid black';
        this.setState({
            location: loc
        })
    }
    submitLocation(loc) {
        this.props.submitLocation(loc);
        this.props.nextScene();
    }
    render() {
        return (
            <div>
                <p>What is your {this.props.type}?</p>
                {this.props.locations.map((loc, ukey) => {
                    return (
                        <div className="selection" key={ukey} onClick={(e) => this.selectLocation(loc, e.target)}>{loc.stop}</div>
                    );
                })}
                <button onClick={() => this.submitLocation(this.state.location)}>Submit</button>
            </div>
        );
    }
}