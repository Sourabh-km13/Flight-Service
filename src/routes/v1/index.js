const express = require('express');

const { InfoController } = require('../../controllers');
const flightRouter = require('./flight-route');

const router = express.Router();

router.use('/flight',flightRouter)

router.get('/info', InfoController.info);

module.exports = router;