import React, {Component} from 'react';
import GoogleMapsLoader from 'google-maps';

export class Map extends Component {
    componentDidMount() {
        let el = document.getElementById('map');
        let center = { lat: this.props.lat, lng: this.props.lng };
        let monmouth = this.props.destCoords;
        console.log(monmouth);
        GoogleMapsLoader.KEY = process.env.GOOGLE_MAPS_KEY;
        GoogleMapsLoader.load((google)  => {
            let map = new google.maps.Map(el, {
                zoom: 15,
                center: center 
            });
            let current = new google.maps.Marker({
                position: center,
                map: map
            });
            let origin = new google.maps.Marker({
                position: monmouth,
                map: map,
            });
        });
        setTimeout(() => {
            fetch('/ready', {
                method: 'post',
            })
                .then((res) => {
                    console.log('res: ', res);
                    return res.json();
                })
                .then((res) => {
                    console.log('second res: ', res);
                    if (res.ready) {
                        fetch('/duration', {
                            method: 'post',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: {},
                        })
                            .then((res) => {
                                console.log(res);
                                return res.json();
                            })
                            .then((res) => {
                                console.log('res: ', res);
                                this.setState({dist: res.dist, duration: res.duration});
                            })
                            .catch((err) => {
                                console.log('err: ', err);
                            })
                    } else {
                        console.log('not ready');
                    }
                });
        }, 5000);


    }
    render() {
        if (this.state && this.state.dist) {
            return (
                <div>distance to monmouth: {this.state.dist}, duration: {this.state.duration}</div>
            )
        } else {
            return (
                <div></div>
            );
        }
    }
}