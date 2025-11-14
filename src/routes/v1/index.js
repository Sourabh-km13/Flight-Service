const express = require('express');

const { InfoController } = require('../../controllers');
const airplaneRouter = require('./airplane-route');
const cityRouter = require('./city-route');
const airportRouter = require('./airport-route');

const router = express.Router();

router.use('/airplane',airplaneRouter)
router.use('/city',cityRouter)
router.use('/airport',airportRouter)
router.get('/info', InfoController.info);

module.exports = router;