const FlightNumber = require('../models/FlightNumber.js')

const flightNumberController = {
    index: async (req, res) => {
        try {
            const flightNumbers = await FlightNumber.find({})
            res.json(flightNumbers)
        } catch (err) {
            console.log(err)
        }
    },
    show: async (req, res) => {
        try {
            const flightNumberId = req.params.id
            const flightNumber = await FlightNumber.findById(flightNumberId)
            res.json(flightNumber)
        } catch (err) {
            console.log(err)
            res.json(err)
        }
    },
    create: async (req, res) => {
        try {
            const newFlightNumber = req.body
            const savedFlightNumber = await FlightNumber.create(newFlightNumber)
            res.json(savedFlightNumber)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    update: async (req, res) => {
        try {
            const flightNumberId = req.params.id
            const updatedFlightNumber = req.body
            const savedFlightNumber = await FlightNumber.findByIdAndUpdate(flightNumberId, updatedFlightNumber, {new: true})
            res.json(savedFlightNumber)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    delete: async (req, res) => {
        console.log('DELETE')
        try {
            const flightNumberId = req.params.id
            const deletedFlightNumber = await FlightNumber.findByIdAndRemove(flightNumberId)
            res.json(deletedFlightNumber)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = flightNumberController 