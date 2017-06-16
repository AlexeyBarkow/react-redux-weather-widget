/* eslint-disable no-console, comma-dangle, no-param-reassign, prefer-arrow-callback */
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';
import geoRouter from './routes/geo';
import weatherRouter from './routes/weather';

import { PORT } from './constants';

const app = express();
const logger = morgan(':method :url :status :res[content-length] - :response-time ms');

app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'secret' }));
app.use(logger);
app.use('/api', geoRouter);
app.use('/api', weatherRouter);

if (process.env.NODE_ENV === 'production') {
    const root = path.join(__dirname, '..', 'dist');
    app.use(express.static(root));
    app.get('*', function r(req, res) {
        res.sendFile('index.html', { root });
    });
}

app.listen(PORT, () => {
    console.log(`server is running at localhost:${PORT}`);
});
