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
app.post('/trip-info', (req, res) => {
    this.destination = req.body.destination;
    this.departureTime = req.body.departureTime;
    this.destCoords = req.body.destCoords;

    console.log(this.destination, this.departureTime, this.destCoords);
});

app.post('/update', (req, res) => {
    console.log(req.body);
    this.currentLat = req.body.currentCoords.lat;
    this.currentLng = req.body.currentCoords.lng;

    this.destination = req.body.dest.stop;
    this.stops = req.body.stops;

    this.destinationLat = req.body.dest.coords.lat;
    this.destinationLng = req.body.dest.coords.lng;

    distance.get(
        {
            origin: `${this.currentLat}, ${this.currentLng}`,
            destination: `${this.destinationLat}, ${this.destinationLng}`,
            units: 'imperial',
            mode: 'driving',
        }, function(err, data) {
            if (err) return console.log(err);
            this.dist = data.distance;
            this.duration = data.duration;
            console.log('distance remaining: ', this.dist);
            console.log('duration remaining: ', this.duration);
        });
});
