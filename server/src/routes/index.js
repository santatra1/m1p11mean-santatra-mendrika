const express = require('express')
const clientRoutes = require('./clientRoutes')
const roleRoutes = require('./roleRoutes')
const authRoutes = require('./authRoutes')
const employeeRoutes = require('./managers/employeeRoutes')

const router = express.Router()
const api = '/api'

router.use(api, clientRoutes)
router.use(api, roleRoutes)
router.use(api, authRoutes)
router.use(api, employeeRoutes)

module.exports = router
