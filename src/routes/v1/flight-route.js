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

flightRouter.patch('/:id',
    flightMiddleware.validateSeatUpdate, 
    FlightController.updateRemainingSeats
)

module.exports = flightRouter