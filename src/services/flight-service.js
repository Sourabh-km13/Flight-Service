const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const { FlightRepository } = require("../repositories");
const { Op } = require("sequelize");

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

async function getAllFlights(query){
    let customFilter = {}
    let sortFilters = []

    //trips:MUM-DEL
    if(query.trips){
        [departureAirportId,arrivalAirportId] = query.trips.split('-')
        customFilter.departureAirportId = departureAirportId
        customFilter.arrivalAirportId = arrivalAirportId
    }
    if(query.price){
        [minPrice, maxPrice] = query.price.split('-')
        customFilter.price = {
            [Op.between]:[minPrice, maxPrice]
        }
    }
    const start = new Date(`${query.tripDate}T00:00:00.000Z`);
    const end = new Date(`${query.tripDate}T23:59:59.999Z`);

    if(query.tripDate){
        customFilter.departureTime = {
            [Op.between]:[start , end]
        }
    }
    if(query.sort){
        const params = query.sort.split(',')
        sortFilters = params.map(param => param.split('-'))

        
    }
    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilters)
        return flights
    } catch (error) {
        throw new AppError('Cannot fetch data of all flights' , StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


module.exports = {createFlight, getAllFlights
}