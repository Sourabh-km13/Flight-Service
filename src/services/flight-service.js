const { StatusCodes } = require("http-status-codes");
const {FlightRepository} = require("../repositories");
const AppError = require("../utils/errors/app-error");

const flightRepository = new FlightRepository()

async function createAirplane(data) {
    try {
        const airplane = await flightRepository.create(data)
        return airplane
    } catch (error) {
        if(error.name = "SequelizeValidationError"){
            let explanation = []
            error.errors.forEach(err => {
                explanation.push(err.message)
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
            
        }
        throw new AppError("cannot create new flight object",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {createAirplane}