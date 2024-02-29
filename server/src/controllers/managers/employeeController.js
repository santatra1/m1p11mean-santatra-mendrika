const Role = require('../../models/Role')
const User = require('../../models/User')
const Employee = require('../../models/Employee')
const Service = require('../../models/Service')
const RendezVous = require('../../models/RendezVous')
const Paiement = require('../../models/Paiement')

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
  byServiceId: async (req, res) => {
    try {
      const { serviceId } = req.params;

      const employees = await Employee.find({ service: serviceId }).populate("service");
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
  },

  getCommissionMonitoring: async (req, res) => {
    try {
      const employeeId = req.params.id;
      const dateParam = req.params.date;
  
      // Parse the date parameter into a Date object
      const selectedDate = new Date(dateParam);
  
      const now = new Date();
  
      const todayStart = new Date(selectedDate);
      todayStart.setHours(0, 0, 0, 0);
  
      const todayEnd = new Date(todayStart);
      todayEnd.setHours(23, 59, 59, 999);
  
      const pastAppointments = await RendezVous.find({
        employee: employeeId,
        date: {
          $gte: todayStart,
          $lte: todayEnd,
        },
      }).populate('service');
  
      const commissionData = await Promise.all(pastAppointments.map(async (appointment) => {
        const { service, startHour, _id } = appointment;
        const { prix, commission } = service;
  
        const appointmentDateTime = new Date(appointment.date).setHours(startHour, 0, 0, 0);
  
        if (appointmentDateTime < now) {
          const payment = await Paiement.findOne({ rendezVous: _id });
  
          if (!payment) {
            return null;
          }
  
          const commissionAmount = Math.round((commission / 100) * prix);
          return {
            service: service.nom,
            startHour: startHour,
            duree: service.duree,
            prix: service.prix,
            commissionAmount: commissionAmount,
          };
        }
        return null;
      }));
  
      const validCommissionData = commissionData.filter(Boolean);
  
      const totalCommission = validCommissionData.reduce((acc, curr) => acc + curr.commissionAmount, 0);
  
      res.status(200).json({
        commissionData: validCommissionData,
        totalCommission,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  
  
}

module.exports = employeeController
