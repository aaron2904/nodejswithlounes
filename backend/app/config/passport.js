require('dotenv').config();

const User = require('../models/userModel'),
LocalStrategy = require('passport-local').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt,
JwtStrategy = require('passport-jwt').Strategy,
passport = require('passport');
    bcrypt = require('bcrypt');

exports.localStrategy = new LocalStrategy({usernameField: 'email'},  (username, password, done) => {
    User.findOne({
        where: {
            email: username
        }
    })
    .then( (err, user) => {
        if (err && bcrypt.compareSync(password, err.password)){
            return done(err)
        }
        if(!user){
            return done(null, false, {errorMsg: 'Combinaison incorrecte.'})
        }
    })
    .catch((err) => {
        return done(err)
    })
})
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: process.env.SECRET_PASS
}

exports.JwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
    User.findOne({
        where: {
            email: payload.email,
            password: payload.password
        }
    })
    .then((userInfo, err) => {
        const user = JSON.stringify(userInfo)
        if (err) {
            return done(err, false, {errorMsg: 'Combinaison incorrecte.'})
        }
        if (!user) {
            return done(err, false, {errorMsg: 'Combinaison incorrecte.'})
        }
        return done(user, null)
    })
    .catch((err) => {
        return done(err)
    })
})
exports.checkIsAuth = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, null)(req, res, next)
}