const express = require('express');
const { WEATHER_API_URL } = require('../constants');
const { get } = require('../utils/request');

const router = express.Router();

router.use('*', (req, res) => {
    get(`${WEATHER_API_URL}${req.path}`).then(({ body }) => {
        res.send(body);
    });
});

module.exports = router;
