const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/managers/employeeController');

router.get('/employee', employeeController.all);
router.post('/employee/create', employeeController.create);
router.post('/employee/:id/update', employeeController.update);

module.exports = router;
