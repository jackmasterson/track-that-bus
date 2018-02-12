import React, {Component} from 'react';

import {Button} from 'react-bootstrap';

export class SceneNavigator extends Component {
    render() {
        if (this.props.scene === this.props.last) {
            return (
                <div>
                    <Button onClick={() => this.props.previousScene()}>Back</Button>
                </div>
            )
        }
        if (this.props.scene > 0) {
            return (
                <div>
                    <Button onClick={() => this.props.nextScene()}>Next</Button>
                    <Button onClick={() => this.props.previousScene()}>Back</Button>
                </div>
            );
        } else if (this.props.scene === 0) {
            return (
                <div>
                    <Button onClick={() => this.props.nextScene()}>Next</Button>
                </div>
            );
        }
    }
}