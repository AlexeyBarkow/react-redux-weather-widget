/* eslint-disable no-console, comma-dangle, no-param-reassign */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const webpack = require('webpack');
const { passport } = require('./passport');
const { PORT } = require('./constants');
const webpackConfig = require('../webpack.config.js');
const webpackDevConfig = require('../config/webpack-dev-server.config.js');
const { get } = require('./utils/request');
const weatherRouter = require('./routes/weather');

const app = express();
const logger = morgan(':method :url :status :res[content-length] - :response-time ms');

// app.use('/api', weatherRouter);
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger);
const compiler = webpack(webpackConfig);


// app.get('/', (req, res) => {
//     res.status(200).send(`hello, ${JSON.stringify(req.user)}`);
// });

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
