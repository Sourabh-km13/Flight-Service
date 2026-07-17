const { Sequelize } = require("sequelize");
const { StatusCodes } = require("http-status-codes");
const {Flight, Airplane, Airport, City} = require("../models");
const CrudRepository = require("./crud-repository");
const db = require("../models");
const { addRowLockFlights } = require("./queries");
const AppError = require("../utils/errors/app-error");

const airportCityInclude = {
    model: City,
    required: false,
}

const flightDetailIncludes = [
    {
        model: Airplane,
        required: true,
        as: 'AirplaneDetail',
    },
    {
        model: Airport,
        required: true,
        on: {
            col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("DepartureAirport.code")),
        },
        as: 'DepartureAirport',
        include: [airportCityInclude],
    },
    {
        model: Airport,
        required: true,
        on: {
            col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("ArrivalAirport.code")),
        },
        as: 'ArrivalAirport',
        include: [airportCityInclude],
    },
]

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight)
    }
    async getAllFlights(filter, sort){
        const response = await Flight.findAll({
            where:filter,
            order:sort,
            include: flightDetailIncludes,
        })
        return response
    }
    async get(id, options = {}){
        if (options.transaction) {
            return super.get(id, options)
        }

        const response = await Flight.findByPk(id, {
            include: flightDetailIncludes,
        })
        if (!response) {
            throw new AppError("Not able to find this resource", StatusCodes.NOT_FOUND)
        }
        return response
    }
    async updateRemainingSeats(flightId, seats, dec=true){
        const transaction = await db.sequelize.transaction()
        try {
            const seatCount = Number(seats)
            if (!Number.isInteger(seatCount) || seatCount <= 0) {
                throw new AppError('Seat count must be a positive integer', StatusCodes.BAD_REQUEST)
            }

            const { query, replacements } = addRowLockFlights(flightId)
            await db.sequelize.query(query, { transaction, replacements })

            const flight = await this.get(flightId, { transaction })
            if (!parseInt(dec)) {
                if (flight.totalSeats < seatCount) {
                    throw new AppError('Not enough seats available', StatusCodes.BAD_REQUEST)
                }
                await flight.decrement('totalSeats', { by: seatCount, transaction })
            } else {
                await flight.increment('totalSeats', { by: seatCount, transaction })
            }

            await flight.reload({ transaction })
            await transaction.commit()
            return flight
        } catch (error) {
            await transaction.rollback()
            throw error
        }
        
    }
}
module.exports = FlightRepository
