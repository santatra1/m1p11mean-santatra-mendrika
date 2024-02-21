const express = require('express');
const router = express.Router();
const serviceController = require('../../controllers/clients/serviceController');

const authenticateToken = require('../../middleware/authenticateToken');
const role = require('../../middleware/role');

router.get('/clients/service',authenticateToken, role('client'), serviceController.all);

module.exports = router;
