const Role = require('../models/Role')
const User = require('../models/User')
const Client = require('../models/Client')

const clientController = {
  createClient: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body

      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ message: 'Cet utilisateur existe déjà.' })
      }
      
      const userRole = await Role.findOne({ name: "client" })
   
      if (!userRole) {
        return res.status(400).json({ message: 'Rôle non trouvé.' })
      }

      const newUser = new User({
        email: email,
        password: password,
        role: userRole._id,
      })

      const savedUser = await newUser.save()

      const newClient = new Client({
        firstName,
        lastName,
        user: savedUser._id,
      })

      const savedClient = await newClient.save()

      res.status(201).json("ok")
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

module.exports = clientController
