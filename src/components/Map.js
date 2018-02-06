import React, {Component} from 'react';
import GoogleMapsLoader from 'google-maps';

export class Map extends Component {
    componentWillMount() {
        console.log(this.props.mapped);
        this.markers = this.markers || [];
        let el = document.getElementById('map');
        GoogleMapsLoader.load((google) => {
            let map = new google.maps.Map(el, {
                zoom: 8,
                center: this.props.mapped.originCoords,
            });
       
            let destinationWindow = new google.maps.InfoWindow({
                content: `<h4>End Destination: ${this.props.mapped.destination}</h4>`
            });
            let destination = new google.maps.Marker({
                position: this.props.mapped.destinationCoords,
                map: map
            });
            destination.addListener('click', () => {
                destinationWindow.open(map, destination);
            });

            let originWindow = new google.maps.InfoWindow({
                content: `<h4>Origin: ${this.props.mapped.origin}</h4>`
            });
            let origin = new google.maps.Marker({
                position: this.props.mapped.originCoords,
                map: map
            });
            origin.addListener('click', () => {
                originWindow.open(map, origin);
            });
        });
    }
    render() {
        return (
            <div>Map, Origin is:  {this.props.mapped.origin}</div>
        )
    }
}