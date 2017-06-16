/* eslint-disable no-console, comma-dangle, no-param-reassign */
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';
import geoRouter from './routes/geo';
import weatherRouter from './routes/weather';
import { passport } from './passport';
import { PORT } from './constants';

const app = express();
const logger = morgan(':method :url :status :res[content-length] - :response-time ms');

app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger);
app.use('/api', geoRouter);
app.use('/api', weatherRouter);

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login'],
    }),
    (req, res) => {
        res.redirect('/');
    }
);

app.get('/fail', (req, res) => {
    res.send('fail');
});

app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/fail',
    successRedirect: '/'
}));

app.get('/auth/logout',
    (req, res) => {
        req.logout();
        res.redirect('/');
    });

app.listen(PORT, () => {
    console.log(`server is running at localhost:${PORT}`);
});
