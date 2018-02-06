import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export class Location extends Component {
    selectLocation(loc, div) {
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
                <h3>What is your <span 
                        className="colorful">
                         {this.props.type}
                    </span>?
                </h3>
                {this.props.locations.map((loc, ukey) => {
                    return (
                        <Button 
                            className="selection" 
                            key={ukey} 
                            onClick={(e) => this.selectLocation(loc, e.target)}>
                            {loc.stop}
                        </Button>
                    );
                })}
                <br/>
                <button onClick={() => this.submitLocation(this.state.location)}>Submit</button>
            </div>
        );
    }
}