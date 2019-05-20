const express = require('express')
const router = express.Router()

const flightNumberController = require('../controllers/flightNumberController')

router.get('/', flightNumberController.index)
router.post('/', flightNumberController.create)
router.get('/:id', flightNumberController.show)
router.put('/:id', flightNumberController.update)
router.delete('/:id', flightNumberController.delete)

module.exports = router