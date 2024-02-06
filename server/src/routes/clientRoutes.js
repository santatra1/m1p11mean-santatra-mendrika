const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Définition des routes
router.post('/clients', clientController.createClient);

module.exports = router;
