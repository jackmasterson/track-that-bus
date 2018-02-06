import React, {Component} from 'react';
import GoogleMapsLoader from 'google-maps';

export class Map extends Component {
    componentWillMount() {
        this.markers = this.markers || [];
        let el = document.getElementById('map');
        GoogleMapsLoader.load((google) => {
            let map = new google.maps.Map(el, {
                zoom: 9,
                center: this.state.data.currentCoords
            });
            let current = new google.maps.Marker({
                position: this.state.data.currentCoords,
                map: map
            });
            let currentWindow = new google.maps.InfoWindow({
                content: '<h1>Current Location</h1>'
            });
            current.addListener('click', () => {
                currentWindow.open(map, current);
            });
        });
    }
    render() {
        return (
            <div>Map, Origin is:  {this.props.mapped.origin}</div>
        )
    }
}