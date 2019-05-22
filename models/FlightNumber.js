const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema

const FlightNumber = new Schema({
    number: String,
    crewMembers: [Number],
    planeType: String,
    recyclingProduced: Number
    
})

module.exports = mongoose.model('FlightNumber', FlightNumber) 