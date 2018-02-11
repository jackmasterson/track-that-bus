const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();
const DIST_DIR = path.join(__dirname, 'public');
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);
const bodyParser = require('body-parser');
const distance = require('google-distance');

this.buids = {};

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
    let buid = req.body.buid;
    this.buids[buid] = req.body.currentCoords;
    this.buids[buid].stops = req.body.stops;
    this.buids[buid].gmapi = process.env.GOOGLE_MAPS_API;
    this.buids[buid].destination = req.body.destination;
    this.buids[buid].stopData = {};
    this.buids[buid].destinationData = {};
    distance.get(
        {
            origin: `${req.body.currentCoords.lat}, ${req.body.currentCoords.lng}`,
            destination: `${req.body.destination.coords.lat}, ${req.body.destination.coords.lng}`,
            units: 'imperial',
            mode: 'driving',
        }, (err, data) => {
            if (err) return console.log(err);
            let name = req.body.destination.stop;
            this.buids[buid].distance = data.distance;
            this.buids[buid].duration = data.duration;
        });
    req.body.stops.map((stop) => {
        stop = JSON.parse(stop);

        distance.get(
            {
                origin: `${req.body.currentCoords.lat}, ${req.body.currentCoords.lng}`,
                destination: `${stop.coords.lat}, ${stop.coords.lng}`,
                units: 'imperial',
                mode: 'driving',
            }, (err, data) => {
                if (err) return console.log(err);
                let name = stop.stop;
                this.buids[buid].stopData[name] = {
                    distance: data.distance,
                    duration: data.duration
                }
            });
    })
});


app.post('/user', (req, res) => {
    res.send(this.buids);
});