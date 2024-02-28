const express = require('express');
const router = express.Router();
const rendezvousController = require('../controllers/rendezvousController');

const authenticateToken = require('../middleware/authenticateToken');
const role = require('../middleware/role');
router.get('/rendezvous/client/:clientId',authenticateToken, role(['employee','client']), rendezvousController.getRdvByClient);
router.get('/rendezvous/:employeeId/:date',authenticateToken, role(['employee','client']), rendezvousController.getRdvByEmployee);
router.post('/rendezvous/create',authenticateToken, role(['client']), rendezvousController.createRendezVous);

module.exports = router;
