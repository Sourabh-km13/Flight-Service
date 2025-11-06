const { Cities } = require("../models");
const CrudRepository = require( "./crud-repository");

class CityRepository extends CrudRepository {
    constructor(){
        super(Cities)
    }
}

module.exports = CityRepository