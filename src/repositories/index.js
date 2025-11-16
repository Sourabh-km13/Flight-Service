const CityRepository = require("./city-repository");
const AirplaneRepository = require("./airplane-repository");
const AirportRepository = require("./airport-repository");
const FlightRepository = require("./flight-repository");

module.exports = {
    AirplaneRepository : AirplaneRepository,
    CityRepository:CityRepository,
    AirportRepository:AirportRepository,
    FlightRepository:FlightRepository
}