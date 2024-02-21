const Service = require('../../models/Service')

const serviceController = {
  all: async (req, res) => {
    try {
      const { nom, description } = req.params

      const filter = {};
      if (nom) filter.nom = { $regex: new RegExp(nom, 'i') };
      if (description) filter.description = { $regex: new RegExp(description, 'i') };

      const services = await Service.find(filter);
      return res.status(201).json({
        services
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Erreur interne du serveur.' })
    }
  }
}

module.exports = serviceController
