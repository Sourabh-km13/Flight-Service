const express = require ('express')
const {AirportController} = require('../../controllers')
const {airportMiddleware} = require('../../middlewares')


const airportRouter = express.Router()


airportRouter.post("/",airportMiddleware,AirportController.createAirport)
airportRouter.get("/",AirportController.getAirports)
airportRouter.get("/:id",AirportController.getAirport)
airportRouter.delete("/:id",AirportController.destroyAirport)
airportRouter.patch("/:id",AirportController.updateAirport)

module.exports =airportRouter    