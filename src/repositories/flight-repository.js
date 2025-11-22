const { Sequelize } = require("sequelize");
const {Flight, Airplane, Airport} = require("../models");
const CrudRepository = require("./crud-repository")


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
}
module.exports = FlightRepository

