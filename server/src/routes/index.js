const express = require('express')
const userRoutes = require('./userRoutes')
const roleRoutes = require('./roleRoutes')

const router = express.Router()
const api = '/api'

router.use(api, userRoutes)
router.use(api, roleRoutes)

module.exports = router
