const express = require('express')
const router = express.Router()

const crewMemberController = require('../controllers/crewMemberController')

router.get('/', crewMemberController.index)
router.post('/', crewMemberController.create)
router.get('/:id', crewMemberController.show)
router.put('/:id', crewMemberController.update)
router.delete('/:id', crewMemberController.delete)

module.exports = router