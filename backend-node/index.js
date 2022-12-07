'use strict';
const express = require('express');
const app = express();
const routes = require("./routes.js");
const bodyParser = require('body-parser');
const cors = require("cors");
const session = require('express-session')
const cookieParser = require("cookie-parser")
//const passport = require('./auth.js');
const logger = require('morgan');
const path = require('path');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
//app.use(passport.initialize());
//app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({
    extended: false,
}));
app.use(cookieParser());


//app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SECRET, 
    resave: true,
    saveUninitialized: true
}));





// LOGGER
// const logger = (req,res,next) => {
//     console.log(`Request received at: ${new Date()}`);
//     next()
// }

// const { UserModel } = require('./database/schema.js');
// passport.use(new LocalStrategy(UserModel.authenticate()));
// passport.serializeUser(UserModel.serializeUser());
// passport.deserializeUser(UserModel.deserializeUser());

// const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
// const opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'Oculus Ex Inferni';
// opts.algorithms = ['HS256'];

// passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
//     UserModel.findById(jwt_payload.sub, function (err, user) {
//         console.log(err, user);
//         if (err) {
//             return done(err, false);
//         }
//         if (user) {
//             return done(null, user);
//         } else {
//             return done(null, false);
//         }
//     });
// }));



app.use(routes, logger);

// app.get('/test', passport.authenticate('jwt', { session: false }), (req, res, next) => {
//     res.send('bloop');
// })

app.use((err,req,res,next) => {
    console.log(err);
    res.status(err.status || 500).send(err.message || `Unknown error`);
    next();
})

const server = app.listen(4417, () => {
    console.log(`Server started succesfully on port ${server.address().port}`);
})


module.exports = server;