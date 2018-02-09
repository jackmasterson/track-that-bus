import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

export class DepartureTime extends Component {
    render() {
        return (
            <div>
                What is your departure time?
                <ul className="small-ul">
                    {this.props.times.map((time, incr) => {
                        return (
                            <li key={incr} >
                                <Button 
                                    bsStyle="default"
                                    className="times selection">
                                    <div onClick={(e) => 
                                        this.selectTime(time, e.target)} 
                                    >{time.time}</div>
                                </Button>
                            </li>
                        );
                    })}
                </ul>
               <button onClick={() => this.submitTime(this.state.time)}>Submit</button>
            </div>
        );
    }
    selectTime(time, el) {
        this.divs = document.querySelectorAll('.selection');
        for (let d of this.divs) {
            d.style.border = '';
        }
        el.style.border = '1px solid black';
        this.setState({
            selectedTime: time.time,
        })
    }
    submitTime() {
        this.props.submitTime(this.state.selectedTime);
        this.props.nextScene();
    }
}