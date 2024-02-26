const express = require('express')
const router = express.Router()
const specialOfferController = require('../controllers/managers/specialOfferController')

router.post('/special-offer', specialOfferController.sendSpecialOffer)

module.exports = router