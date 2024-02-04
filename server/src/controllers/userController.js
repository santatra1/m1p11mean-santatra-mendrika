const Role = require('../models/Role')
const User = require('../models/User')

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  createUser: async (req, res) => {
    try {
      const { firstName, lastName, email, password, role } = req.body
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ message: 'Cet utilisateur existe déjà.' })
      }

      const userRole = await Role.findOne({ name: role })
      if (!userRole) {
        return res.status(400).json({ message: 'Rôle non trouvé.' })
      }

      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        role: userRole._id,
      })

      const savedUser = await newUser.save()

      res.status(201).json(savedUser)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erreur interne du serveur.' })
    }
  },

  getUserById: async (req, res) => {
    // Logique pour obtenir un utilisateur par ID
  },

  updateUser: async (req, res) => {
    // Logique de mise à jour d'utilisateur
  },

  deleteUser: async (req, res) => {
    // Logique de suppression d'utilisateur
  },
}

module.exports = userController
