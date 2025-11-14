const { StatusCodes } = require("http-status-codes");
const {AirportRepository} = require("../repositories");
const AppError = require("../utils/errors/app-error");
const logger = require("../config/logger-config");


const airportRepository = new AirportRepository()

async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data)
        return airport
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
            throw new AppError("cannot create new airport object",StatusCodes.INTERNAL_SERVER_ERROR);
        }
        
    }
}
async function getAirports(){
    try {
        const airports = await airportRepository.getAll()
        return airports
    } catch (error) {
        throw new AppError("cannot fetch data of all airports", StatusCodes.INTERNAL_SERVER_ERROR)
    }
        
            
}
async function getAirport(id){
    try {
        const airport = await airportRepository.get(id)
        return airport
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError("The airport you requested does not exist",error.statusCode)
        }
    }
        
            
}

async function destroyAirport(id){
    try {
        const airport = await airportRepository.destroy(id)
        return airport
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError("The airport you requested to delete does not exist",error.statusCode)
        }
    }
}

async function updateAirport(id , property){
    
    try {
        console.log("calling updateairport");
        const airport = await airportRepository.update(id,property)
        return airport
    } catch (error) {
        console.log("catching error in serivce",error)
        if(error.statusCode === StatusCodes.NOT_FOUND){
            console.log("throwing");
            throw new AppError("The airport you requested to update does not exist",error.statusCode)
            
        }
        if(error.statusCode === StatusCodes.BAD_REQUEST){
            throw new AppError("The properties you requested to update does not exist",error.statusCode)
        }
        throw new AppError("Something went wrong",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {createAirport, getAirports, getAirport, destroyAirport, updateAirport}