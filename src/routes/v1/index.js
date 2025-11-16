const express = require('express');

const { InfoController } = require('../../controllers');
const airplaneRouter = require('./airplane-route');
const cityRouter = require('./city-route');
const airportRouter = require('./airport-route');
const flightRouter = require('./flight-route');

const router = express.Router();

router.use('/airplane',airplaneRouter)
router.use('/city',cityRouter)
router.use('/airport',airportRouter)
router.use('/flight',flightRouter)
router.get('/info', InfoController.info);

module.exports = router;