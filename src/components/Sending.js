import React, {Component} from 'react';

export class Sending extends Component {
    componentDidMount() {
        this.props.method();
    }
    render() {
        return (
            <div>Sending...</div>
        );
    }
}