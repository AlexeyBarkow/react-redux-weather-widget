/* eslint-disable no-console, no-param-reassign, consistent-return */
const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth2');
const { PORT, DOMAIN, GOOGLE_CLIENT_ID, GOOGLE_SECRET } = require('./constants');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: `${DOMAIN}:${PORT}/auth/google/callback`,
    passReqToCallback: true,
}, (request, accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
        console.log(profile);
        return done(null, profile);
    });
}));

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

module.exports = {
    ensureAuthenticated,
    passport,
};
