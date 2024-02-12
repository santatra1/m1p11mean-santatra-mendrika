const Role = require('../models/Role')
const User = require('../models/User')
const Employee = require('../models/Employee')
const Service = require('../models/Service')

const employeeController = {
  create: async (req, res) => {
    try {
      const { firstName, lastName, email, password, service_id } = req.body

      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ message: 'Cet utilisateur existe déjà.' })
      }

      const service = await Service.findOne({ _id: service_id })
      if (service) {
        return res.status(400).json({ message: "Le service n'existe déjà." })
      }
      
      const userRole = await Role.findOne({ name: "employé" })
   
      if (!userRole) {
        return res.status(400).json({ message: 'Rôle non trouvé.' })
      }

      const newUser = new User({
        email: email,
        password: password,
        role: userRole._id,
      })

      const savedUser = await newUser.save()

      const newEmployee = new Client({
        firstName,
        lastName,
        user: savedUser._id,
        service: service._id
      })

      const savedEmployee = await newEmployee.save()

      return res.status(201).json({
        message: "Client ajouté avec succès"
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Erreur interne du serveur.' })
    }
  },

  getEmployeeByUserId: async (req, res) => {
    try{
      const employee = await Employee.findOne({ user: req.params.id })
      .populate({
        path: 'user',
        populate: {
          path: 'role'
        }
      });

      return res.status(201).json({ employee  })
    }catch(error){
      console.error(error)
      return res.status(500).json({ message: 'Erreur interne du serveur.' })
    }
  },

  update: async (req, res) => {
  },

  delete: async (req, res) => {
  },
}

module.exports = clientController
