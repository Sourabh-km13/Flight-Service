const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { failResponse ,successResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");



async function createAirplane (req, res){
    console.log(req.body)
    try {
        const response = await AirplaneService.createAirplane({
            modelNumber:req.body.modelNumber,
            capacity:req.body.capacity
        })
        res.status(StatusCodes.CREATED).json({
            success:true,
            message:"Created airplane",
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
        const response = await AirplaneService.getAirplanes()
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
        const response = await AirplaneService.getAirplane(req.params.id)
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
        const response = await AirplaneService.destroyAirplane(req.params.id)
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
        const response = await AirplaneService.updateAirplane(req.params.id,req.body)

        successResponse.data = response
        return res.status(StatusCodes.OK).json(successResponse)
        
    } catch (error) {
        failResponse.error = error
        return res.status(error.statusCode).json(failResponse)
        
    }

}

module.exports = {createAirplane ,getAirplanes , getAirplane, destroyAirplane, updateAirplane}