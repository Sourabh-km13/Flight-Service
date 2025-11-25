const { Sequelize } = require("sequelize");
const {Flight, Airplane, Airport} = require("../models");
const CrudRepository = require("./crud-repository");
const db = require("../models");
const { addRowLockFlights } = require("./queries");


class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight)
    }
    async getAllFlights(filter, sort){
        const response = await Flight.findAll({
            where:filter,
            order:sort,
            include:[
                {
                    model:Airplane,
                    required:true,
                    as:'AirplaneDetail'
                },
                {
                    model:Airport,
                    required:true,
                    on:{
                        col1:Sequelize.where(Sequelize.col("Flight.departureAirportId"),"=",Sequelize.col("DepartureAirport.code"))
                    },
                    as:'DepartureAirport'
                },
                {
                    model:Airport,
                    required:true,
                    on:{
                        col1:Sequelize.where(Sequelize.col("Flight.arrivalAirportId"),"=",Sequelize.col("ArrivalAirport.code"))
                    },
                    as:'ArrivalAirport'
                }
            ],
            
        })
        return response
    }
    async updateRemainingSeats(flightId, seats, dec=true){
        await db.sequelize.query(addRowLockFlights(flightId))
        const flight = await this.get(flightId)
        if(parseInt(dec)){
            await flight.decrement('totalSeats',{by:seats})
        } else{
            await flight.increment('totalSeats',{by:seats})
        }
        return flight
    }
}
module.exports = FlightRepository

