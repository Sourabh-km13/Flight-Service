const { Airports } = require("../models");
const CrudRepository = require( "./crud-repository");

class AirportRepository extends CrudRepository {
    constructor(){
        super(Airports)
    }
}

module.exports = AirportRepository 