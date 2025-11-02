const { Airplane } = require("../models");
const CrudRepository = require( "./crud-repository");

class FlightRepository extends CrudRepository {
    constructor(){
        super(Airplane)
    }
}

module.exports = FlightRepository 