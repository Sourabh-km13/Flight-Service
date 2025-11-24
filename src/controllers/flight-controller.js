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
async function getAllFlights(req, res){
    try {
        const response = await FlightService.getAllFlights(req.query)
        successResponse.data = response
        return res.status(StatusCodes.OK).json(successResponse)
        
    } catch (error) {
        failResponse.error = error
        return res.status(error.statusCode).json(failResponse)
        
    }
}
async function getFlight(req, res){
    try {
        const response = await FlightService.getFlight(req.params.id)
        successResponse.data = response
        return res.status(StatusCodes.OK).json(successResponse)
        
    } catch (error) {
        failResponse.error = error
        return res.status(error.statusCode).json(failResponse)
        
    }
}

module.exports = {createFlight, getAllFlights, getFlight }