import React, {Component} from 'react';
import {Link} from 'react-router-dom';


export class Init extends Component {
    render() {
        return (
            <div className="launch-div">
                <div>Welcome! Are you a Passenger or a Driver?</div>
                <Link className="spaced" to="/passenger">Passenger</Link>
                <Link className="spaced" to="/driver">Driver</Link>
            </div>
        )
    }
}
