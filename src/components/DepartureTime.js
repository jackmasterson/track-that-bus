import React, {Component} from 'react';

export class DepartureTime extends Component {
    render() {
        return (
            <div>
                <h2>What is your departure time?</h2>
                {this.props.times.map((time, incr) => {
                    return (
                        <div key={incr} className="times">
                            <div onClick={(e) => 
                                this.selectTime(time, e.target)} 
                             >{time.time}</div>
                        </div>
                    );
                })}
               <button onClick={() => this.submitTime(this.state.time)}>Submit</button>
            </div>
        );
    }
    selectTime(time, el) {
        let quer = document.querySelectorAll('.times');
        for (let t = 0; t < quer.length; t++) {
            let q = quer[t];
            q.style.border = '';
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