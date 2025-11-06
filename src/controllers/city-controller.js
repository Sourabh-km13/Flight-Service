const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { failResponse ,successResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");



async function createCity (req, res){
    console.log(req.body)
    try {
        const response = await CityService.createCity({
            name:req.body.name
        })
        res.status(StatusCodes.CREATED).json({
            success:true,
            message:"Created City",
            data:response,
            error:{}
        })
    } catch (error) {
        console.log(error)
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
async function getCities(req,res){
    try {
        const response = await CityService.getCities()
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
async function getCity(req,res){
    try {
        const response = await CityService.getCity(req.params.id)
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
async function destroyCity(req,res){
    try {
        const response = await CityService.destroyCity(req.params.id)
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
async function updateCity(req,res){
    try {
        const response = await CityService.updateCity(req.params.id,req.body)

        successResponse.data = response
        return res.status(StatusCodes.OK).json(successResponse)
        
    } catch (error) {
        failResponse.error = error
        return res.status(error.statusCode).json(failResponse)
        
    }

}

module.exports = {createCity ,getCities , getCity, destroyCity, updateCity}