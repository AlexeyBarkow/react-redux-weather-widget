/* eslint-disable prefer-arrow-callback */
import { Router } from 'express';
import { get } from '../utils/http';
import { GEONAMES_API_URL, USERNAME } from '../api/constants';

const router = Router();


router.get('/searchJSON', function r(req, res) {
    const query = req.query;
    get(`${GEONAMES_API_URL}/searchJSON`, { ...query, username: USERNAME })
        .then((response) => {
            res.send(response.body);
        }).catch((err) => {
            console.error(err);
            res.send(err);
        });
});

router.get('/citiesJSON', function r(req, res) {
    const query = req.query;
    get(`${GEONAMES_API_URL}/citiesJSON`, { ...query, username: USERNAME })
        .then((response) => {
            res.send(response.body);
        }).catch((err) => {
            console.error(err);
            res.send(err);
        });
});

export default router;
