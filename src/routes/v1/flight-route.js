const express = require ('express')
const {FlightController} = require('../../controllers')
const { validateCreateRequest } = require('../../middlewares')


const flightRouter = express.Router()


flightRouter.post("/",validateCreateRequest,FlightController.createFlight)

module.exports =flightRouter