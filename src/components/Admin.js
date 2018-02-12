import React, {Component} from 'react';
import {Location} from './Location';
import {Stops} from './Stops';
import {Sending} from './Sending';

import {SceneNavigator} from './SceneNavigator';

export class Admin extends Component {
    componentWillMount() {
        this.locations = [{
            direction: 'Northbound',
            stops: ['Forked River', 'Monmouth', 'Red Bank', 'PNC', 'Cheesequake'],
        }, {
            direction: 'Southbound',
            stops: ['Cheesequake', 'PNC', 'Red Bank', 'Monmouth', 'Forked River'],
        }];
        this.display = [{
            component: <Location
                locations={this.locations}
                submitLocation={(loc) => this.props.submitLocation(loc)}
                nextScene={() => this.props.nextScene()}
                previousScene={() => this.props.previousScene()}
                scene={this.props.scene}
            />
        }, {
            component: <Stops 
                        locations={this.locations}
                        addStops={(stop) => this.props.addStops(stop)}
                        removeStops={(stop) => this.props.removeStops(stop)}
                        plannedStops={() => this.getStops()}/>
        }, {
            component: <Sending 
                            method={() => this.props.method()}
                        />
        }]
    }
    getStops() {
        return this.props.plannedStops;
    }
    render() {
        return (
            <div>
                <div>{this.display[this.props.scene].component}</div>
                <SceneNavigator
                    nextScene={() => this.props.nextScene()}
                    previousScene={() => this.props.previousScene()}
                    scene={this.props.scene}
                    last={this.display.length - 1}
                />
            </div>
        );
    }
}