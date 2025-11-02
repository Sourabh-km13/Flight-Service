const {FlightRepository} = require("../repositories")

const flightRepository = new FlightRepository()

async function createAirplane(data) {
    try {
        const airplane = await flightRepository.create(data)
        return airplane
    } catch (error) {
        console.log("error in service layer")
        throw error
    }
}

module.exports = {createAirplane}