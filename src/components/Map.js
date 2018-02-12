import React, {Component} from 'react';
import GoogleMapsLoader from 'google-maps';

export class Map extends Component {
    componentWillMount() {
        this.data = this.props.destinations;
        this.buids = {}
        
        const el = document.getElementById('map');

        GoogleMapsLoader.KEY = this.props.gmapi;
        GoogleMapsLoader.load((google) => {

            let map = new google.maps.Map(el, {
                zoom: 8,
                center: { lat: 40.3499661, lng: -74.0877706 },
            });

            this.google = google;
            this.map = map;


            for (let data of this.data) {
                let keys = Object.keys(data);
                keys.map((k) => {
                    this.createMarker(data[k], k);
                });
            }
        });

    }
    createMarker(data, buid) {
        this.buids[buid] = {};
        this.buids[buid].markers = this.buids[buid].markers || [];
        this.buids[buid].data = data;
        this.buids[buid].data.current = { lat: 40.3499661, lng: -74.0877706 };

        let current = new google.maps.Marker({
            position: data.current,
            map: this.map,
            buid: buid,
            current: true,
            icon: {
                url: '../img/center.png', 
                size: new google.maps.Size(20, 20),
            },
            infowindow: new this.google.maps.InfoWindow({
                content: `<h4>${data.direction}</h4>`,
            }),
        });

        this.buids[buid].markers.push(current);

        let keys = Object.keys(data);
        keys.map((k, incr) => {
            k === 'stops' ? this.createStops(data[k], buid) : k;
        });

        current.addListener('click', () => {
            for (let info of this.buids[buid].markers) {
                info.infowindow.close();
            }
            current.infowindow.open(this.map, current);
            this.hideAll(buid);
            this.changeVisibility(buid);
        });
        
        this.setDirection(buid);
    }
    hideAll(buid) {
        let keys = Object.keys(this.buids);
        for (let k of keys) {
            this.buids[k].markers.map(marker => {
                marker.current ? marker : marker.setVisible(false);
            });
        }
    }
    changeVisibility(buid) {
        let markers = this.buids[buid].markers;
        markers.map(marker => {
            marker.remaining ? marker.setVisible(true) : marker;
        });
    }

    createStops(stops, buid) {
        let keys = Object.keys(stops);
        keys.map(k => {
            let marker = new google.maps.Marker({
                position: stops[k].stop,
                map: this.map,
                stopName: stops[k].location,
                infowindow: new this.google.maps.InfoWindow({
                    content: `<h4>${stops[k].location}</h4>`
                }),
                buid: buid,
            });

            this.buids[buid].markers = this.buids[buid].markers || [];
            this.buids[buid].markers.push(marker);

            marker.addListener('click', () => {
                for (let info of this.buids[buid].markers) {
                    info.infowindow.close();
                }
                marker.infowindow.open(this.map, marker);
            });
        });
    }
    setDirection(buid) {
        let bus = this.buids[buid];
        if (bus.data.south) {
            bus.direction = (x, y) => x - y;
        } else {
            bus.direction = (x, y) => x + y;
        }
        this.setBreakPoints(bus, buid);
    }
    setBreakPoints(bus, buid) {
        let currentLat = bus.data.current.lat;
        let remaining = {};
        let remainingMarkers = [];
        bus.data.stops.map((stop) => {
            let stopLat = stop.stop.lat;
            if (bus.direction(stopLat, currentLat) < 0) {
                remaining[stopLat] = stop.stop;
            }
        });
        this.buids[buid].markers.map(marker => {
            let markerLat = marker.position.lat();
            if (remaining[markerLat]) {
                marker.remaining = true;
                remainingMarkers.push(marker);
            } else if (!marker.current) {
                marker.setVisible(false);
            }
        });
        this.buids[buid].markers = remainingMarkers;
        this.buids[buid].nextStop = this.buids[buid].markers[0];
        console.log(this.buids[buid].nextStop.stopName);
        this.appendNextStop(this.buids[buid].nextStop.stopName);
    }
    appendNextStop(stop) {
        let el = document.querySelector('.above-map');
        el.innerHTML = `<h3>Next Stop: ${stop}</h3>
                        <h4>Distance: distance</h4>
                        <h4>Duration: duration</h4>`;
    }
    render() {
        return (
            <div className="above-map">Hey</div>
        )
    }
}