const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { failResponse ,successResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");



async function createFlight(req, res){
    console.log(req.body)
    try {
        const response = await FlightService.createFlight({
            flightNumber:req.body.flightNumber,
            airplaneId:req.body.airplaneId,
            departureAirportId:req.body.departureAirportId,
            arrivalAirportId:req.body.arrivalAirportId,
            arrivalTime:req.body.arrivalTime,
            departureTime:req.body.departureTime,
            price:req.body.price,
            boardingGage:req.body.boardingGage,
            totalSeats:req.body.totalSeats
        })
        successResponse.data = response
        res.status(StatusCodes.CREATED).json({successResponse})
    } catch (error) {
        if(error instanceof AppError){
            failResponse.data = error
            res.status(error.statusCode).json({
                failResponse
            })
        }
        else{
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                failResponse
            })
        }
    }
}


module.exports = {createFlight }