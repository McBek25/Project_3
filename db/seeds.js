const FlightNumber = require('../models/FlightNumber.js')
const mongoose = require('./connection.js')

const saved = async () => {
    await FlightNumber.deleteMany()
    const ATLHSV = new FlightNumber({number: "DL1688", crewMembers: [123456, 789101, 121314], planeType: "717-200", recyclingProduced: 4})
    await ATLHSV.save()
    const HSVATL = new FlightNumber({number: "DL2954", crewMembers: [123456, 789101, 121314], planeType: "717-200", recyclingProduced: 5})
    await HSVATL.save()
} 

saved()