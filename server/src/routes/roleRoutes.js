const express = require('express')
const router = express.Router()
const roleController = require('../controllers/roleController')

// Définition des routes
router.get('/roles', roleController.getAllRoles)
router.get('/roles/:id', roleController.getRoleById)

module.exports = router
