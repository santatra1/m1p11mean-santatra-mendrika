const Service = require('../../models/Service');

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
