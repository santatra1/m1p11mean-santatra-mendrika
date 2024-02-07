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

      return res.status(201).json({
        message: "Client ajouté avec succès"
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Erreur interne du serveur.' })
    }
  },

  getClientByUserId: async (req, res) => {
    try{
      const client = await Client.findOne({ user: req.params.id })
      .populate({
        path: 'user',
        populate: {
          path: 'role'
        }
      });

      return res.status(201).json({ client: client  })
    }catch(error){
      console.error(error)
      return res.status(500).json({ message: 'Erreur interne du serveur.' })
    }
  },

  updateUser: async (req, res) => {
    // Logique de mise à jour d'utilisateur
  },

  deleteUser: async (req, res) => {
    // Logique de suppression d'utilisateur
  },
}

module.exports = clientController
