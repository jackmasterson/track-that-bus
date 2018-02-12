const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();
const DIST_DIR = path.join(__dirname, 'public');
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);
const bodyParser = require('body-parser');
const distance = require('google-distance');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users = require('./users');

this.buids = this.buids || [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})); 

app.use(express.static(DIST_DIR));
app.use(passport.initialize());
app.use(passport.session());

console.log('app listening on port ', PORT);

let authed = false;
let userName;

app.get('*', (req, res) => {
    if (!authed) {
        res.sendFile(path.join(DIST_DIR, 'unauthed.html'));
    } else {
        app.post('/driver-data', (req, res) => {
            res.send({userName})
        })
        res.sendFile(path.join(DIST_DIR, 'authed.html'));
    }
});

// passport
passport.use(new LocalStrategy(
    function(username, password, done) {
        let us = users.run();
        for (let user of us) {
            if (user.username === username && user.password === password) {
                console.log('match!');
                userName = user.username;
                authed = true;
                done(null, user);
                break;
            } else {
                console.log('not valid user');
            }
        }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/driver',
        failureRedirect: '/login',
        failureFlash: 'Invalid username or password'
    })
);
// end passport

app.post('/update', (req, res) => {
    let south;
    if (req.body.direction === 'Southbound') {
        south = true;
    }
    let data = {
        current: req.body.current,
        direction: req.body.direction,
        south: south,
        stops: [],
    };
    let locations = {
        'Port Authority': { lat: 40.7568858, lng: -73.9931965 },
        'Cheesequake': { lat: 40.4664835, lng: -74.2916424 },
        'PNC': { lat: 40.3853523, lng: -74.1848752 },
        'Red Bank': { lat: 40.3499661, lng: -74.0877706 },
        'Monmouth': { lat: 40.1983467, lng: -74.1013166 },
        'Forked River': { lat: 39.8741802, lng: -74.2168655 },
    };

    req.body.stops.map((stop, incr) => {
        data.stops.push({stop: locations[stop], location: stop});
    });

    this.buids.push({
       [Date.now()]: data,
    });
});


app.post('/user', (req, res) => {
    res.send(this.buids);
});