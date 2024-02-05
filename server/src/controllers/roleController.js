const Role = require('../models/Role')

const roleController = {
  getAllRoles: async (req, res) => {
    try {
      const roles = await Role.find()
      res.status(200).json(roles)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  getRoleById: async (req, res) => {
    // Logique pour obtenir un role par ID
  },
}

module.exports = roleController
