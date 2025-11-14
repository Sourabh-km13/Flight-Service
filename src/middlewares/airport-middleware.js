const { StatusCodes } = require("http-status-codes");
const { failResponse } = require("../utils/common");

function validateCreateReq(req, res , next){
    if(!req.body.name){
        failResponse.message = 'Something went wrong while creating airport'
        failResponse.error = 'name not found in the incoming request'
        
        return res.status(StatusCodes.BAD_REQUEST).json(failResponse)
    }
    if(!req.body.code){
        failResponse.message = 'Something went wrong while creating airport'
        failResponse.error = 'airport code not found in the incoming request'
        
        return res.status(StatusCodes.BAD_REQUEST).json(failResponse)
    }
    if(!req.body.cityId){
        failResponse.message = 'Something went wrong while creating airport'
        failResponse.error = 'cityId not found in the incoming request'
        
        return res.status(StatusCodes.BAD_REQUEST).json(failResponse)
    }
    next()
}

module.exports = validateCreateReq