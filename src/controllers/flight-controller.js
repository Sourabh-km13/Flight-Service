const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");

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
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:"Error in Creating flight",
            data:{},
            error:error
        })
    }
}

module.exports = {createFlight}