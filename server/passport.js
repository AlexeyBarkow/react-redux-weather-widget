/* eslint-disable no-console, no-param-reassign, consistent-return */
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { PORT, DOMAIN, GOOGLE_CLIENT_ID, GOOGLE_SECRET } from './constants';


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
    process.nextTick(() => done(null, profile));
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
