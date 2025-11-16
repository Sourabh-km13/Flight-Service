const { StatusCodes } = require("http-status-codes");
const { failResponse } = require("../utils/common");

function validateCreateReq(req, res , next){
    if(!req.body.flightNumber){
        failResponse.message = 'Something went wrong while creating airport'
        failResponse.error = 'flightNumber not found in the incoming request'
        
        return res.status(StatusCodes.BAD_REQUEST).json(failResponse)
    }
    if(!req.body.airplaneId){
        failResponse.message = 'Something went wrong while creating airport'
        failResponse.error = 'airplaneId not found in the incoming request'
        
        return res.status(StatusCodes.BAD_REQUEST).json(failResponse)
    }
    if(!req.body.departureAirportId){
        failResponse.message = 'Something went wrong while creating airport'
        failResponse.error = 'departureAirportId not found in the incoming request'
        
        return res.status(StatusCodes.BAD_REQUEST).json(failResponse)
    }
    if(!req.body.arrivalAirportId){
        failResponse.message = 'Something went wrong while creating airport'
        failResponse.error = 'arrivalAirportId not found in the incoming request'
        
        return res.status(StatusCodes.BAD_REQUEST).json(failResponse)
    }
    if(!req.body.arrivalTime){
        failResponse.message = 'Something went wrong while creating airport'
        failResponse.error = 'arrivalTime not found in the incoming request'
        
        return res.status(StatusCodes.BAD_REQUEST).json(failResponse)
    }
    if(!req.body.departureTime){
        failResponse.message = 'Something went wrong while creating airport'
        failResponse.error = 'departureTime not found in the incoming request'
        
        return res.status(StatusCodes.BAD_REQUEST).json(failResponse)
    }
    if(!req.body.price){
        failResponse.message = 'Something went wrong while creating airport'
        failResponse.error = 'price not found in the incoming request'
        
        return res.status(StatusCodes.BAD_REQUEST).json(failResponse)
    }
    if(!req.body.totalSeats){
        failResponse.message = 'Something went wrong while creating airport'
        failResponse.error = 'totalSeats     not found in the incoming request'
        
        return res.status(StatusCodes.BAD_REQUEST).json(failResponse)
    }
    next()
}

module.exports = validateCreateReq