const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const { CityRepository } = require("../repositories");

const cityRepository = new CityRepository();

async function getCities (){
    try {
        const cities = await cityRepository.getAll()
        return cities
    } catch (error) {
        throw new AppError("cannot fetch data of all cities", StatusCodes.INTERNAL_SERVER_ERROR)
    }

}
async function createCity(data) {
    try {
        console.log("service",data)
        const city = await cityRepository.create(data)
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
            throw new AppError("cannot create new city object",StatusCodes.INTERNAL_SERVER_ERROR);
        }
        
    }
}
async function getCity(id){
    try {
        const city = await cityRepository.get(id)
        return city
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError("The city you requested does not exist",error.statusCode)
        }
    }
        
            
}

async function destroyCity(id){
    try {
        const city = await cityRepository.destroy(id)
        return city
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError("The city you requested to delete does not exist",error.statusCode)
        }
    }
}

async function updateCity(id , property){
    
    try {
        console.log("calling updatecity");
        const city = await cityRepository.update(id,property)
        return city
    } catch (error) {
        console.log("catching error in serivce",error)
        if(error.statusCode === StatusCodes.NOT_FOUND){
            console.log("throwing");
            throw new AppError("The city you requested to update does not exist",error.statusCode)
            
        }
        if(error.statusCode === StatusCodes.BAD_REQUEST){
            throw new AppError("The properties you requested to update does not exist",error.statusCode)
        }
        throw new AppError("Something went wrong",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {getCities, createCity, getCity, destroyCity, updateCity}