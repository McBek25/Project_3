const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema

const CrewMember = new Schema({
    number: String,
    name: String,
    individualRecyclingProduced: Number 
})

module.exports = mongoose.model('CrewMember', CrewMember)

