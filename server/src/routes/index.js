const express = require('express')
const clientRoutes = require('./clientRoutes')
const roleRoutes = require('./roleRoutes')
const authRoutes = require('./authRoutes')
const employeeRoutes = require('./managers/employeeRoutes')
const serviceRoutes = require('./managers/serviceRoutes')
const clientServiceRoutes = require('./clients/serviceRoutes')
const mailRoutes = require('./mailRoutes')
const specialOfferRoutes = require('./specialOfferRoutes')
const rendezvousRoutes = require('./rendezvousRoutes')

const router = express.Router()
const api = '/api'

router.use(api, clientRoutes)
router.use(api, roleRoutes)
router.use(api, authRoutes)
router.use(api, employeeRoutes)
router.use(api, serviceRoutes)
router.use(api, clientServiceRoutes)
router.use(api, mailRoutes)
router.use(api, specialOfferRoutes)
router.use(api, rendezvousRoutes)

module.exports = router
