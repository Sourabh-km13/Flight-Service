const { StatusCodes } = require("http-status-codes");
const {FlightRepository} = require("../repositories");
const AppError = require("../utils/errors/app-error");
const logger = require("../config/logger-config");


const flightRepository = new FlightRepository()

async function createAirplane(data) {
    try {
        const airplane = await flightRepository.create(data)
        return airplane
    } catch (error) {
        logger.error(error.name)
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
async function getAirplanes(){
    try {
        const airplanes = await flightRepository.getAll()
        return airplanes
    } catch (error) {
        throw new AppError("cannot fetch data of all airplanes", StatusCodes.INTERNAL_SERVER_ERROR)
    }
        
            
}
async function getAirplane(id){
    try {
        const airplane = await flightRepository.get(id)
        return airplane
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError("The airplane you requested does not exist",error.statusCode)
        }
    }
        
            
}

module.exports = {createAirplane, getAirplanes, getAirplane}