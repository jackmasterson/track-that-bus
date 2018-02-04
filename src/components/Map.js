import React, {Component} from 'react';
import GoogleMapsLoader from 'google-maps';

export class Map extends Component {
    componentWillMount() {

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
            console.log('res: ', res);
            this.setState({
                data: res,
            });
        })
        .catch((err) => {
            console.log('err is: ', err);
        });
        let el = document.getElementById('map');
        let dest = this.props.destCoords;

        GoogleMapsLoader.KEY = process.env.GOOGLE_MAPS_KEY;
        GoogleMapsLoader.load((google)  => {
            let map = new google.maps.Map(el, {
                zoom: 9,
                center: this.state.data.currentCoords 
            });
            let current = new google.maps.Marker({
                position: this.state.data.currentCoords,
                map: map
            });
            let origin = new google.maps.Marker({
                position: this.state.data.destinationCoords,
                map: map,
            });
        });
    }
    render() {
        if (this.state && this.state.data) {
            return (
                <div>
                    <div>you've got {this.state.data.distanceToDestination} until {this.state.data.destination}</div>
                    <div>you've got {this.state.data.durationToDestination} until {this.state.data.destination}</div>
                    <div>it's stopping at {this.state.data.stops}</div>
                </div>
            );
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }
}