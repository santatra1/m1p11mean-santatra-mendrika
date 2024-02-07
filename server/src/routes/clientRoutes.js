const express = require('express');
const User = require("../models/User")
const authenticateToken = require('../middleware/authenticateToken');
const role = require('../middleware/role');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Définition des routes
router.post('/clients', clientController.createClient);

router.get('/clients/:id',authenticateToken,role("client"), clientController.getClientByUserId);

module.exports = router;
