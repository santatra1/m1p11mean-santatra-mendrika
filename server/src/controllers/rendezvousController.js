const RendezVous = require('../models/RendezVous')
const Paiement = require('../models/Paiement')
const Client = require('../models/Client')
const Employee = require('../models/Employee')
const moment = require('moment');

const rendezvousController = {
  getRdvByEmployee: async (req, res) => {
    try {
      const { employeeId, date } = req.params
      const dateRdv = new Date(date)
      const rendezvous = await RendezVous.find({ employee: employeeId, date: dateRdv }).populate("service")
      res.status(200).json(rendezvous)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  getRdvByEmployeeUserAccount: async (req, res) => {
    try {
      const employee = await Employee.findOne({ user: req.user.id })
      console.log(employee)
   
      if (!employee) {
        return res.status(400).json({ message: 'Employé non trouvé.' })
      }
      const rendezvous = await RendezVous.find({ employee: employee._id }).populate("service").populate("client")
      res.status(200).json(rendezvous)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  getRdvByClient: async (req, res) => {
    try {
      const {clientId} = req.params
      const rendezvous = await RendezVous.find({ client: clientId }).populate("service")
      res.status(200).json(rendezvous)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  getRdvForCurrentDay: async (req, res) => {
    try {
      const currentDate = moment();
      const startOfDay = currentDate.clone().startOf('day');
      const endOfDay = currentDate.clone().endOf('day');
  
      const result = await RendezVous.aggregate([
        {
          $match: {
            date: {
              $gte: startOfDay.toDate(),
              $lte: endOfDay.toDate(),
            }
          }
        },
        {
          $group: {
            _id: null,
            count: { $sum: 1 }
          }
        }
      ]);
  
      const rdvCountForCurrentDay = result.length > 0 ? result[0].count : 0;
  
      res.status(200).json({ count: rdvCountForCurrentDay });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors du calcul des rendez-vous pour la date d\'aujourd\'hui.' });
    }
  },
  
  

  getRdvEachMonth: async (req, res) => {
    try {
      const startDate = moment('2024-01-01');
      const endDate = moment('2024-12-31');
  
      const result = await RendezVous.aggregate([
        {
          $match: {
            date: {
              $gte: startDate.toDate(),
              $lte: endDate.toDate(),
            }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: '$date' },
              month: { $month: '$date' }
            },
            count: { $sum: 1 }
          }
        }
      ]);
  
      const monthlyCounts = [];
  
      const currentMonth = startDate.clone();
      while (currentMonth.isSameOrBefore(endDate, 'month')) {
        const monthYearKey = currentMonth.format('YYYY-MM');
        const monthName = currentMonth.format('MMMM');
  
        const resultEntry = result.find(entry => entry._id.year === currentMonth.year() && entry._id.month === currentMonth.month() + 1);
  
        monthlyCounts.push({
          monthYear: monthYearKey,
          monthName: monthName,
          count: resultEntry ? resultEntry.count : 0,
        });
  
        currentMonth.add(1, 'month');
      }
  
      res.status(200).json(monthlyCounts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors du calcul des rendez-vous par mois.' });
    }
  },



  createRendezVous: async (req, res) => {
    try {
      const { date, startHour, service, employee, cardNumber, amount } = req.body;

      const dateRdv = new Date(date);
      const startHourRdv = parseInt(startHour.split(":")[0])

      console.log(req.user);

      const client = await Client.findOne({
        user: req.user.id
      });

      if (!client) {
        return res.status(403).json({ message: 'Client non trouver.' })
      }
      console.log(client)
      const newRendezVous = new RendezVous({
        date: dateRdv,
        startHour: startHourRdv,
        service,
        employee,
        client: client._id
      })

      const savedRendezVous = await newRendezVous.save();

      const newPaiement = new Paiement({
        cardNumber,
        amount,
        rendezVous: savedRendezVous._id
      });

      const savedPaiement = await newPaiement.save();

      return res.status(201).json({
        message: "Rendez vous ajouté avec succès",
        savedRendezVous
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Erreur interne du serveur.' })
    }
  },
}

module.exports = rendezvousController
