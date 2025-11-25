function addRowLockFlights(flightId){
    return `Select * from flights where Flights.id = ${flightId} for update`
}

module.exports = {addRowLockFlights}