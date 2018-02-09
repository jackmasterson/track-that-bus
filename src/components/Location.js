import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export class Location extends Component {
    selectLocation(loc, div) {
        this.divs = document.querySelectorAll('.selection');
        for (let d of this.divs) {
            d.style.border = '';
        }
        div.style.border = '1px solid black';
        this.setState({
            location: loc
        })
    }
    submitLocation(loc) {
        for (let d of this.divs) {
            d.style.border = '';
        }
        this.props.submitLocation(loc);
        this.props.nextScene();
    }
    render() {
        return (
            <div>
                What is your <span 
                        className="colorful">
                         {this.props.type}
                    </span>?
                    Scroll for more
                <ul className="small-ul">
                {this.props.locations.map((loc, ukey) => {
                    return (
                        <li key={ukey}>
                            <Button 
                                className="selection" 
                                onClick={(e) => this.selectLocation(loc, e.target)}>
                                {loc.stop}
                            </Button>
                        </li>
                    );
                })}
                </ul>
                <br/>
                <button onClick={() => this.submitLocation(this.state.location)}>Submit</button>
            </div>
        );
    }
}