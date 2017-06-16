/* eslint-disable prefer-arrow-callback no-console */
import { Router } from 'express';
import { get } from '../utils/http';
import { WEATHER_API_URL, DEFAULT_API_KEY } from '../api/constants';

const router = Router();

router.get('/weather', function r(req, res) {
    const query = req.query;
    get(`${WEATHER_API_URL}/weather`, { ...query, APPID: DEFAULT_API_KEY }).then((response) => {
        res.send(response.body);
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });
});

router.get('/forecast', function r(req, res) {
    const query = req.query;
    get(`${WEATHER_API_URL}/forecast`, { ...query, APPID: DEFAULT_API_KEY }).then((response) => {
        res.send(response.body);
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });
});

router.get('/find', function r(req, res) {
    const query = req.query;
    get(`${WEATHER_API_URL}/find`, { ...query, APPID: DEFAULT_API_KEY }).then((response) => {
        res.send(response.body);
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });
});

export default router;
