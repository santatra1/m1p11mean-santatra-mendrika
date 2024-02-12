const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/managers/employeeController');

// Définition des routes
router.post('/employee', employeeController.create);

module.exports = router;
