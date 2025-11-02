const express = require ('express')
const {FlightController} = require('../../controllers')

const flightRouter = express.Router()


flightRouter.post("/",FlightController.createFlight)

module.exports =flightRouter