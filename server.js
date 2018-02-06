const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();
const DIST_DIR = path.join(__dirname, 'public');
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);
const bodyParser = require('body-parser');
const distance = require('google-distance');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})); 

app.use(express.static(DIST_DIR));

console.log('app listening on port ', PORT);
app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.post('/update', (req, res) => {
    console.log(req.body);
    this.currentLat = req.body.currentCoords.lat;
    this.currentLng = req.body.currentCoords.lng;

    // this.destination = req.body.dest.stop;
    // this.stops = req.body.stops;

    // this.destinationLat = req.body.dest.coords.lat;
    // this.destinationLng = req.body.dest.coords.lng;

    // distance.get(
    //     {
    //         origin: `${this.currentLat}, ${this.currentLng}`,
    //         destination: `${this.destinationLat}, ${this.destinationLng}`,
    //         units: 'imperial',
    //         mode: 'driving',
    //     }, (err, data) => {
    //         if (err) return console.log(err);
    //         this.dist = data.distance;
    //         this.duration = data.duration;
    //     });
});

app.post('/user', (req, res) => {
    let stops = [];
    // this.stops = JSON.parse(this.stops);
    // for (let t = 0; t < this.stops.length; t++) {
    //     console.log('stop: ', this.stops[t]);
    //     let stop = this.stops[t];
    //     distance.get(
    //         {
    //             origin: `${this.currentLat}, ${this.currentLng}`,
    //             destination: `${stop.coords.lat}, ${stop.coords.lng}`,
    //             units: 'imperial',
    //             mode: 'driving',
    //         }, (err, data) => {
    //             if (err) return console.log(err);
    //             stops.push({
    //                 stop: stop.stop,
    //                 distance: data.distance,
    //                 duration: data.duration,
    //                 coords: stop.coords,
    //             });
    //             if (stops.length === this.stops.length) {
    //                 res.send(JSON.stringify({
    //                         currentCoords: {
    //                             lat: this.currentLat,
    //                             lng: this.currentLng
    //                         },
    //                         stops: stops,
    //                         distanceToDestination: this.dist,
    //                         durationToDestination: this.duration,
    //                         destination: this.destination,
    //                         destinationCoords: {
    //                             lat: this.destinationLat,
    //                             lng: this.destinationLng,
    //                         }
    //                     }
    //                 ));
    //             }
    //         });
    // }

});
