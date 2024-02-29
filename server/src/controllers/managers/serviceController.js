const Service = require('../../models/Service');
const Paiement = require('../../models/Paiement');
const RendezVous = require('../../models/RendezVous')
const moment = require('moment');

const serviceController = {
  createService: async (req, res) => {
    try {
      const { nom, description, prix, duree, commission } = req.body;

      const existingService = await Service.findOne({ nom });
      if (existingService) {
        return res.status(400).json({ message: 'Ce service existe déjà.' });
      }

      const newService = new Service({
        nom,
        description,
        prix,
        duree,
        commission,
      });

      const savedService = await newService.save();

      return res.status(201).json({
        message: 'Service ajouté avec succès',
        service: savedService,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
  },

  getAllServices: async (req, res) => {
    try {
      const services = await Service.find();
      return res.status(200).json({ services });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
  },

  getServiceById: async (req, res) => {
    try {
      const service = await Service.findById(req.params.id);
      if (!service) {
        return res.status(404).json({ message: 'Service non trouvé.' });
      }
      return res.status(200).json({ service });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
  },

  updateService: async (req, res) => {
    try {
      const updatedService = await Service.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedService) {
        return res.status(404).json({ message: 'Service non trouvé.' });
      }

      return res.status(200).json({
        message: 'Service mis à jour avec succès',
        service: updatedService,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
  },

  getTurnOverPerMonths: async (req, res) => {
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
          $lookup: {
            from: 'paiements',
            localField: '_id',
            foreignField: 'rendezVous',
            as: 'paiements',
          }
        },
        {
          $group: {
            _id: {
              year: { $year: '$date' },
              month: { $month: '$date' }
            },
            chiffreAffaires: { $sum: { $sum: '$paiements.amount' } }
          }
        }
      ]);
  
      const chiffreAffairesByMonth = [];
  
      const currentMonth = startDate.clone();
      while (currentMonth.isSameOrBefore(endDate, 'month')) {
        const monthYearKey = currentMonth.format('YYYY-MM');
        const monthName = currentMonth.format('MMMM');
  
        const resultEntry = result.find(entry => entry._id.year === currentMonth.year() && entry._id.month === currentMonth.month() + 1);
  
        chiffreAffairesByMonth.push({
          monthYear: monthYearKey,
          monthName: monthName,
          chiffreAffaires: resultEntry ? resultEntry.chiffreAffaires : 0,
        });
  
        currentMonth.add(1, 'month');
      }
  
      res.status(200).json(chiffreAffairesByMonth);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors du calcul du chiffre d\'affaires par mois.' });
    }
  },

  getTurnOverForCurrentDay: async (req, res) => {
    try {
      const currentDate = moment();
      const startDate = currentDate.clone().startOf('day');
      const endDate = currentDate.clone().endOf('day');
  
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
          $lookup: {
            from: 'paiements',
            localField: '_id',
            foreignField: 'rendezVous',
            as: 'paiements',
          }
        },
        {
          $group: {
            _id: null,
            chiffreAffaires: { $sum: { $sum: '$paiements.amount' } }
          }
        }
      ]);
  
      const chiffreAffairesForCurrentDay = [];
  
      const dayKey = startDate.format('YYYY-MM-DD');
  
      chiffreAffairesForCurrentDay.push({
        day: dayKey,
        chiffreAffaires: result.length > 0 ? result[0].chiffreAffaires : 0,
      });
  
      res.status(200).json(chiffreAffairesForCurrentDay);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors du calcul du chiffre d\'affaires pour la date d\'aujourd\'hui.' });
    }
  },

  deleteService: async (req, res) => {
    try {
      const deletedService = await Service.findByIdAndDelete(req.params.id);

      if (!deletedService) {
        return res.status(404).json({ message: 'Service non trouvé.' });
      }

      return res.status(200).json({ message: 'Service supprimé avec succès' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
  },
};

module.exports = serviceController;
