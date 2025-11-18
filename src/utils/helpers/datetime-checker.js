function dateTimeChecker (arrivalTime , departureTime){
    let date1 = new Date(arrivalTime)
    let date2 = new Date(departureTime)

    return date2>date1
}

module.exports = dateTimeChecker