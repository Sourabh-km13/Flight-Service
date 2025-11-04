const express = require ('express')
const {FlightController} = require('../../controllers')
const { validateCreateRequest } = require('../../middlewares')


const flightRouter = express.Router()


flightRouter.post("/",validateCreateRequest,FlightController.createFlight)
flightRouter.get("/",FlightController.getAirplanes)
flightRouter.get("/:id",FlightController.getAirplane)
flightRouter.delete("/:id",FlightController.destroyAirplane)
flightRouter.patch("/:id",FlightController.updateAirplane)

module.exports =flightRouter    