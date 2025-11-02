const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { failResponse } = require("../utils/common");


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
        failResponse.error = error
        return res.status(error.statusCode).json({
            failResponse
        })
    }
}

module.exports = {createFlight}