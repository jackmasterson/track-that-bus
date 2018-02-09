import React, {Component} from 'react';

export class SelectionScreen extends Component {
    selectDestination(val, e) {
        let d = e.target;
        d.style.border = '1px solid black';
        let divs = document.querySelectorAll('.selection');
        for (let div of divs) {
            div.style.border = '';
        }
        this.props.selectDestination(val);
        
    }
    render() {
        return (
            <div>
                <div><h2>Destinations</h2>
                    {this.options.destinations.map((dest, incr) => {
                        return (
                            <div className="selection" key={incr} onClick={(e) => this.selectDestination(dest, e)}>{dest.dest}</div>
                        );
                    })}
                </div>
            </div>
        );
    }
}