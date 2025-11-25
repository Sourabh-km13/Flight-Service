const { StatusCodes } = require("http-status-codes");
const { failResponse } = require("../utils/common");
const { dateTimeChecker } = require("../utils");

function validateCreateReq(req, res , next){
    if(!req.body.flightNumber){
        failResponse.message = 'Something went wrong while creating flight'
        failResponse.error = 'flightNumber not found in the incoming request'
        
        return res.status(StatusCodes.BAD_REQUEST).json(failResponse)
    }
    if(!req.body.airplaneId){
        failResponse.message = 'Something went wrong while creating flight'
        failResponse.error = 'airplaneId not found in the incoming request'
        
        return res.status(StatusCodes.BAD_REQUEST).json(failResponse)
    }
    if(!req.body.departureAirportId){
        failResponse.message = 'Something went wrong while creating flight'
        failResponse.error = 'departureAirportId not found in the incoming request'
        
        return res.status(StatusCodes.BAD_REQUEST).json(failResponse)
    }
    if(!req.body.arrivalAirportId){
        failResponse.message = 'Something went wrong while creating flight'
        failResponse.error = 'arrivalAirportId not found in the incoming request'
        
        return res.status(StatusCodes.BAD_REQUEST).json(failResponse)
    }
    if(!req.body.arrivalTime){
        failResponse.message = 'Something went wrong while creating flight'
        failResponse.error = 'arrivalTime not found in the incoming request'
        
        return res.status(StatusCodes.BAD_REQUEST).json(failResponse)
    }
    if(!req.body.departureTime){
        failResponse.message = 'Something went wrong while creating flight'
        failResponse.error = 'departureTime not found in the incoming request'
        
        return res.status(StatusCodes.BAD_REQUEST).json(failResponse)
    }
    if(!req.body.price){
        failResponse.message = 'Something went wrong while creating flight'
        failResponse.error = 'price not found in the incoming request'
        
        return res.status(StatusCodes.BAD_REQUEST).json(failResponse)
    }
    if(!req.body.totalSeats){
        failResponse.message = 'Something went wrong while creating flight'
        failResponse.error = 'totalSeats     not found in the incoming request'
        
        return res.status(StatusCodes.BAD_REQUEST).json(failResponse)
    }
    next()
}
function validateArrivalTime(req, res, next){
    if(dateTimeChecker(req.body.arrivalTime , req.body.departureTime)){
        next()
    }
    else{
        failResponse.message = "arrival time cannot be greater than departure time"
        res.status(StatusCodes.BAD_REQUEST).json({failResponse})
    }
}
function validateSeatUpdate(req, res, next){
    console.log(req.body)
    if(!req.body.seat){
        failResponse.message = 'Something went wrong while updating flight'
        failResponse.error = 'seats not found in the incoming request'
        
        return res.status(StatusCodes.BAD_REQUEST).json(failResponse)
    }
    if(!Object.keys(req.body).includes('dec')){
        failResponse.message = 'Something went wrong while updating flight'
        failResponse.error = 'increment or decrement not found in the incoming request'
        
        return res.status(StatusCodes.BAD_REQUEST).json(failResponse)
    }
    next()
}
module.exports = {validateCreateReq, validateArrivalTime, validateSeatUpdate}