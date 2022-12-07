const UserModel = require('./database/schema');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;

const services = {
    login: function (req, res) {
        const token = jwt.sign({ sub: req.user.id }, SECRET, { algorithm: 'HS256' });
        res.send(token);
    },
    register: function (req, res) {
        UserModel.register(new User({ username: req.body.username, email: req.body.email }), req.body.password, function (err, user) {
            if (err) {
                return res.status(500).send(err.message);
            }

            passport.authenticate('local')(req, res, function () {
                const token = jwt.sign({ sub: req.user.id }, SECRET, { algorithm: 'HS256' });
                res.status(201).send({ greeting: 'hello ' + req.user.username, token: token });
            });
        });
    }
};

module.exports = services;