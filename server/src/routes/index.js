const express = require('express')
const clientRoutes = require('./clientRoutes')
const roleRoutes = require('./roleRoutes')
const authRoutes = require('./authRoutes')

const router = express.Router()
const api = '/api'

router.use(api, clientRoutes)
router.use(api, roleRoutes)
router.use(api, authRoutes)

module.exports = router
