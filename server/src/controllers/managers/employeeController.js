const Role = require('../../models/Role')
const User = require('../../models/User')
const Employee = require('../../models/Employee')
const Service = require('../../models/Service')

const employeeController = {
  all: async (req, res) => {
    try {
      const { matricule, firstName, lastName } = req.params

      const filter = {};
      if (matricule) filter.matricule = { $regex: new RegExp(matricule, 'i') };
      if (firstName) filter.firstName = { $regex: new RegExp(firstName, 'i') };
      if (lastName) filter.lastName = { $regex: new RegExp(lastName, 'i') };

      const employees = await Employee.find(filter).populate("service");
      return res.status(201).json({
        employees
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Erreur interne du serveur.' })
    }
  },
  create: async (req, res) => {
    try {
      const { matricule, firstName, lastName, email, password, service } = req.body
      console.log(service)
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ message: 'Cet utilisateur existe déjà.' })
      }

      const existingService = await Service.findOne({ _id: service })
      if (!existingService) {
        return res.status(400).json({ message: "Le service n'existe pas." })
      }

      const userRole = await Role.findOne({ name: "employee" })

      if (!userRole) {
        return res.status(400).json({ message: 'Rôle non trouvé.' })
      }

      const newUser = new User({
        email: email,
        password: password,
        role: userRole._id,
      })

      const savedUser = await newUser.save()

      const newEmployee = new Employee({
        matricule,
        firstName,
        lastName,
        user: savedUser._id,
        service: existingService._id
      })

      const savedEmployee = await newEmployee.save()

      return res.status(201).json({
        message: "Employé ajouté avec succès",
        savedEmployee
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Erreur interne du serveur.' })
    }
  },

  getEmployeeByUserId: async (req, res) => {
    try {
      const employee = await Employee.findOne({ user: req.params.id })
        .populate({
          path: 'user',
          populate: {
            path: 'role'
          }
        });

      return res.status(201).json({ employee })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Erreur interne du serveur.' })
    }
  },

  getById: async (req, res) => {
    try {
      const employee = await Employee.findOne({ _id: req.params.id })
        .populate({
          path: 'user',
          populate: {
            path: 'role'
          }
        }).populate("service");

      return res.status(201).json({ employee })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Erreur interne du serveur.' })
    }
  },

  update: async (req, res) => {
    try {
      const { matricule, firstName, lastName, service, email, password, startTime, endTime, isFromEmployee = false } = req.body;

      const dataToUpdate = {
        matricule,
        firstName,
        lastName,
        service,
        startTime,
        endTime,
        isTimeDefine: true
      };

      const dataUserToUpdate = {
        email
      };

      if (password) {
        dataUserToUpdate.password = password;
      }

      let employeeQuery;
      if (isFromEmployee) {
        employeeQuery = { user: req.params.id };
      } else {
        employeeQuery = { _id: req.params.id };
      }

      const [updatedEmployee] = await Promise.all([
        Employee.findOneAndUpdate(employeeQuery, dataToUpdate, { new: true }),
        User.findOneAndUpdate({ _id: req.params.id }, dataUserToUpdate)
      ]);

      return res.status(201).json({ employee: updatedEmployee });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
  }
}

module.exports = employeeController
