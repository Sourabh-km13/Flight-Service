const express = require('express');

const { InfoController } = require('../../controllers');
const flightRouter = require('./flight-route');
const cityRouter = require('./city-route');

const router = express.Router();

router.use('/flight',flightRouter)
router.use('/city',cityRouter)
router.get('/info', InfoController.info);

module.exports = router;