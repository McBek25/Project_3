const CrewMember = require('../models/CrewMember.js')

const crewMemberController = {
    index: async (req, res) => {
        try {
            const crewMembers = await CrewMember.find({})
            res.json(crewMembers)
        } catch (err) {
            console.log(err)
        }
    },
    show: async (req, res) => {
        try {
            const crewMemberId = req.params.id
            const crewMember = await CrewMember.findById(crewMemberId)
            res.json(crewMember)
        } catch (err) {
            console.log(err)
            res.json(err)
        }
    },
    create: async (req, res) => {
        try {
            const newCrewMember = req.body
            const savedCrewMember = await CrewMember.create(newCrewMember)
            res.json(savedCrewMember)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    update: async (req, res) => {
        try {
            const crewMemberId = req.params.id
            const updateCrewMember = req.body
            const savedCrewMember = await CrewMember.findByIdAndUpdate(crewMemberId, updateCrewMember, {new: true})
            res.json(savedCrewMember)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    delete: async (req, res) => {
        console.log('DELETE')
        try {
            const crewMemberId = req.params.id
            const deletedCrewMember = await CrewMember.findByIdAndRemove(crewMemberId)
            res.json(deletedCrewMember)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = crewMemberController 