const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { failResponse ,successResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");



async function createFlight (req, res){
    console.log(req.body)
    try {
        const response = await FlightService.createAirplane({
            modelNumber:req.body.modelNumber,
            capacity:req.body.capacity
        })
        res.status(StatusCodes.CREATED).json({
            success:true,
            message:"Created flight",
            data:response,
            error:{}
        })
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
async function getAirplanes(req,res){
    try {
        const response = await FlightService.getAirplanes()
        successResponse.data = response
        return res.status(StatusCodes.OK).json(successResponse)
        
    } catch (error) {
        failResponse.error = error
        return res.status(error.statusCode).json(failResponse)
        
    }

}

/**
 * GET /:id
 * req.body= {}
 * 
 */
async function getAirplane(req,res){
    try {
        const response = await FlightService.getAirplane(req.params.id)
        successResponse.data = response
        return res.status(StatusCodes.OK).json(successResponse)
        
    } catch (error) {
        failResponse.error = error
        return res.status(error.statusCode).json(failResponse)
        
    }

}
/**
 * DELETE /:id
 * req.body= {}
 * 
 */
async function destroyAirplane(req,res){
    try {
        const response = await FlightService.destroyAirplane(req.params.id)
        successResponse.data = response
        return res.status(StatusCodes.OK).json(successResponse)
        
    } catch (error) {
        failResponse.error = error
        return res.status(error.statusCode).json(failResponse)
        
    }

}
/**
 * UPDATE /:id
 * req.body= {property:data}
 * 
 */
async function updateAirplane(req,res){
    try {
        const response = await FlightService.updateAirplane(req.params.id,req.body)

        successResponse.data = response
        return res.status(StatusCodes.OK).json(successResponse)
        
    } catch (error) {
        failResponse.error = error
        return res.status(error.statusCode).json(failResponse)
        
    }

}

module.exports = {createFlight ,getAirplanes , getAirplane, destroyAirplane, updateAirplane}