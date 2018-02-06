import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

export class DepartureTime extends Component {
    render() {
        return (
            <div>
                <h2>What is your departure time?</h2>
                {this.props.times.map((time, incr) => {
                    return (
                        <Button 
                            bsStyle="default"
                            key={incr} className="times">
                            <div onClick={(e) => 
                                this.selectTime(time, e.target)} 
                             >{time.time}</div>
                        </Button>
                    );
                })}
               <button onClick={() => this.submitTime(this.state.time)}>Submit</button>
            </div>
        );
    }
    selectTime(time, el) {
        this.setState({
            selectedTime: time.time,
        })
    }
    submitTime() {
        this.props.submitTime(this.state.selectedTime);
        this.props.nextScene();
    }
}