const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const { FlightRepository } = require("../repositories");

const flightRepository = new FlightRepository();


async function createFlight(data) {
    try {
        console.log("service",data)
        const city = await flightRepository.create(data)
        return city
    } catch (error) {
        if(error.name === "SequelizeValidationError"){
            let explanation = []
            error.errors.forEach(err => {
                explanation.push(err.message)
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
            
        }if (error.name === "SequelizeDatabaseError") {
            const explanation = error.message || "Database error occurred";
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        else{
            throw new AppError("cannot create new flight object",StatusCodes.INTERNAL_SERVER_ERROR);
        }
        
    }
}


module.exports = {createFlight}