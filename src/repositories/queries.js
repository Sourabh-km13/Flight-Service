function addRowLockFlights(flightId){
    return {
        query: 'SELECT * FROM Flights WHERE id = :flightId FOR UPDATE',
        replacements: { flightId },
    }
}

module.exports = {addRowLockFlights}
