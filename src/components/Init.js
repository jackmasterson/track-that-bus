import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {BrowserRouter as Router, Link, Switch} from 'react-router-dom';

import {User} from './User';
import {Admin} from './Admin';

export class Init extends Component {
    handleClick(type) {
        fetch(`${type}`, {
            method: 'get',
        })
        .then((res) => {
            console.log('res: ', res);
            return res.blob();
        })
        .then((res) => {
            console.log('res two: ', res);
        });
    }
    render() {
        return (
            <div className="launch-div">

                <div>Welcome! Are you a Passenger or a Driver?</div>
                <Button onClick={() => this.handleClick('passenger')}>
                    <a href="/passenger">Passenger</a></Button>
                <Button onClick={() => this.handleClick('driver')}>
                    <a href="/driver">Driver</a></Button>
            </div>
        )
    }
}