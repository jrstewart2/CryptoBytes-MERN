const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { UserModel } = require('./database/schema.js');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
        done(err, user);
    });
})

passport.use(new LocalStrategy((username, password, done) => {
    UserModel.findOne({ username }, (err, user) => {
        if (err) {return done(err); }
        if (!user) { return done(null, false); }
        if (!bcrypt.compareSync(password, user.password)) {return done(null, false); }
        return done(null, user);
    });
}))

module.exports = passport;