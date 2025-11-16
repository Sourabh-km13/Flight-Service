const { FlightController } = require('../../controllers')
const {flightMiddleware} = require('../../middlewares')

const express = require('express')

const flightRouter = express.Router()

flightRouter.post('/',flightMiddleware,FlightController.createFlight)

module.exports = flightRouter