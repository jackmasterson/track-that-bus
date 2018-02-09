import React, {Component} from 'react';
import GoogleMapsLoader from 'google-maps';

export class Map extends Component {
    componentWillMount() {
        console.log('map props: ', this.props);
        this.infowindows = this.infowindows || [];
        let el = document.getElementById('map');
        GoogleMapsLoader.KEY = this.props.gmapi;
        GoogleMapsLoader.load((google) => {
            let map = new google.maps.Map(el, {
                zoom: 10,
                center: this.props.mapped.originCoords,
            });
            
            let destinationData = this.createMarker(google, this.props.mapped.destination, this.props.mapped.destinationCoords, 'Destination', map, this.props.distance, this.props.duration);
            let destinationMarker = destinationData.marker;
            let destinationWindow = destinationData.infowindow;

            let originData = this.createMarker(google, this.props.mapped.origin, this.props.mapped.originCoords, 'Origin', map);
            let originMarker = originData.marker;
            let originWindow = originData.infowindow;
            let stopsData = {};
            console.log('props data: ', this.props.stopData);
            this.props.mapped.stops.map((stop, incr) => {
                console.log('stop here: ', stop);
                stop.duration = this.props.stopData[stop.stop].duration;
                stop.distance = this.props.stopData[stop.stop].distance;
                let stopped = this.createMarker(google, stop.stop, stop.coords, 'Stop', map, stop.distance, stop.duration);
                stopsData[incr] = stopped;
            });

            originWindow.open(map, originMarker);
        });
    }
    createMarker(google, location, coords, type, map, distance, duration) {
        let marker = new google.maps.Marker({
            position: coords,
            map: map        
        });
        let content;
        if (distance && duration) {
            content = `<h4>${type}: ${location}</h4>
                       <h4>Distance: ${distance}</h4>
                       <h4>Duration: ${duration}</h4>`;
        } else {
            content = `<h4>${type}: ${location}</h4>`;
        }
        let infowindow = new google.maps.InfoWindow({
            content
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