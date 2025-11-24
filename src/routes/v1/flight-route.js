const { FlightController } = require('../../controllers')
const {flightMiddleware} = require('../../middlewares')

const express = require('express')

const flightRouter = express.Router()

flightRouter.get('/',FlightController.getAllFlights)
flightRouter.post('/',
    flightMiddleware.validateCreateReq,
    flightMiddleware.validateArrivalTime,
    FlightController.createFlight
)
flightRouter.get('/:id',FlightController.getFlight)

module.exports = flightRouter