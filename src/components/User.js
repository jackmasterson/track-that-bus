import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

import {Map} from './Map';
import {Filter} from './Filter';

export class User extends Component {
    componentWillMount() {
        this.setState({
            locations: null,
            gmapi: '',
        })
    }
    componentDidMount() {
        fetch('/user', {
            method: 'post',
            body: {},
        })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            this.buildOptions(res);
        });
    }
    buildOptions(opts) {
        this.setState({
            opts
        })
    }

    submit() {
        this.setState({
            gmapi: this.state.gmapi
        });
    }
    filtered(locs) {
        this.setState({
            locations: locs,
        })
    }
    render() {
        if (this.state.locations && !this.state.mapped) {
            return (
                <div>
                    <Filter locations={this.state.locations}
                            filtered={(locs) => this.filtered(locs)}/>
                    <ListGroup>
                        {this.state.locations.map((loc, incr) => {
                            return (
                                <ListGroupItem bsSize="large"
                                    className="selection"
                                    key={incr}>{incr}
                                </ListGroupItem>
                            );
                        })}
                        <button 
                            className="fixed-submit fixed-submit-button"
                            onClick={() => this.submit()}>Submit</button>
                    </ListGroup>
                </div>
            )
        } else if (!this.state.opts) {
            return (
                <div>Loading...</div>
            )
        } else {
            return <Map gmapi={this.state.gmapi}
                        destinations={this.state.opts}    
                    />;
        }
    }
}