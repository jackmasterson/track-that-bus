import React, {Component} from 'react';
import GoogleMapsLoader from 'google-maps';

export class Map extends Component {
    componentWillMount() {
        this.infowindows = this.infowindows || [];
        let el = document.getElementById('map');
        GoogleMapsLoader.load((google) => {
            let map = new google.maps.Map(el, {
                zoom: 8,
                center: this.props.mapped.originCoords,
            });
            
            let destinationData = this.createMarker(google, this.props.mapped.destination, this.props.mapped.destinationCoords, 'Destination', map);
            let destinationMarker = destinationData.marker;
            let destinationWindow = destinationData.infowindow;

            let originData = this.createMarker(google, this.props.mapped.origin, this.props.mapped.originCoords, 'Origin', map);
            let originMarker = originData.marker;
            let originWindow = originData.infowindow;

            let stopsData = {};
            this.props.mapped.stops.map((stop, incr) => {
                let stopped = this.createMarker(google, stop.stop, stop.coords, 'Stop', map);
                stopsData[incr] = stopped;
            });

            originWindow.open(map, originMarker);
        });
    }
    createMarker(google, location, coords, type, map) {
        let marker = new google.maps.Marker({
            position: coords,
            map: map
        });

        let infowindow = new google.maps.InfoWindow({
            content: `<h4>${type}: ${location}</h4>`
        });

        this.infowindows.push(infowindow);

        marker.addListener('click', () => {
            for (let info of this.infowindows) {
                info.close();
            }
            infowindow.open(map, marker);
        })
        
        return {
            marker,
            infowindow
        }
    }

    render() {
        return (
            <div></div>
        )
    }
}