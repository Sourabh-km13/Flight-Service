const { FlightController } = require('../../controllers')
const {flightMiddleware} = require('../../middlewares')

const express = require('express')

const flightRouter = express.Router()

flightRouter.post('/',
    flightMiddleware.validateCreateReq,
    flightMiddleware.validateArrivalTime,
    FlightController.createFlight
)
flightRouter.get('/',FlightController.getAllFlights)

module.exports = flightRouter