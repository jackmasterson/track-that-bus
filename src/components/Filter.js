import React, {Component} from 'react'

export class Filter extends Component {
    componentWillMount() {
        this.potentials = {};
        this.props.locations.map((locations, incr) => {
            this.potentials[incr] = {
                stops: [locations.destination, locations.origin],
                rest: locations
            }

            for (let loc of locations.stops) {
                this.potentials[incr].stops.push(loc.stop);
            }
        });
    }
    handleChange(val) {
        let keys = Object.keys(this.potentials);
        let possibilities = [];
        for (let k of keys) {
            let filtered = this.potentials[k].stops.filter((potential) => {
                if (potential.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
                    this.potentials[k].rest.survivedFilter = true;
                    return potential.toLowerCase().indexOf(val.toLowerCase()) !== -1;
                }
            });
            if (filtered.length === 0) {
                this.potentials[k].survivedFilter = false;
            } else {
                possibilities.push(this.potentials[k].rest);
            }
        }
        this.props.filtered(possibilities);
    }
    render() {
        return (
            <input className="fixed-submit" onChange={(e) => this.handleChange(e.target.value)}
                   placeholder="search for stops"/>
        );
    }
}