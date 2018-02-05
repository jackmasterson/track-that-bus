import React, {Component} from 'react';
import GoogleMapsLoader from 'google-maps';

export class Map extends Component {
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
            this.markers = this.markers || [];
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
                })
                for (let stop of res.stops) {
                    let infoContent = `<h2>${stop.stop}</h2>
                                       <h3>${stop.duration}</h3>
                                       <h4>${stop.distance}</h4>`;
                    let marker = new google.maps.Marker({
                        position: stop.coords,
                        map: map,
                    });
                    this.markers.push(marker);
                    let iw = new google.maps.InfoWindow({
                        content: infoContent
                    });
                    marker.addListener('click', function () {
                        iw.open(map, marker);
                    });
                }
            });
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
    }
    render() {
        if (this.state && this.state.data) {
            return (
                <div>
                    <div>click a marker to see the distance to each stop</div>
                </div>
            );
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }
}