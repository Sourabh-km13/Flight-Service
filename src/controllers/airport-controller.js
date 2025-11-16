const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { failResponse ,successResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");



async function createAirport (req, res){
    console.log(req.body)
    try {
        const response = await AirportService.createAirport({
            name:req.body.name,
            code:req.body.code,
            address:req.body.address,
            cityId:req.body.cityId,
        })
        res.status(StatusCodes.CREATED).json({
            success:true,
            message:"Created airport",
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
async function getAirports(req,res){
    try {
        const response = await AirportService.getAirports()
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
async function getAirport(req,res){
    try {
        const response = await AirportService.getAirport(req.params.id)
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
async function destroyAirport(req,res){
    try {
        const response = await AirportService.destroyAirport(req.params.id)
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
async function updateAirport(req,res){
    try {
        const response = await AirportService.updateAirport(req.params.id,req.body)

        successResponse.data = response
        return res.status(StatusCodes.OK).json(successResponse)
        
    } catch (error) {
        failResponse.error = error
        return res.status(error.statusCode).json(failResponse)
        
    }

}

module.exports = {createAirport ,getAirports , getAirport, destroyAirport, updateAirport}