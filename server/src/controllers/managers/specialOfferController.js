const Service = require('../../models/Service');
const { sendEmailAsFunction } = require('../mailController');
const Client = require('../../models/Client');

const specialOfferController = {
  sendSpecialOffer: async (req, res) => {
    try {
      const { service, remise, finalValue } = req.body;

      const updatedService = await Service.findOneAndUpdate(
        { _id: service },
        { $set: { prix: finalValue } },
        { new: true }
      );

      const serviceName = await Service.findById(service);

      if (!updatedService || !serviceName) {
        return res.status(404).json({ message: 'Service non trouvé.' });
      }

      const allClients = await Client.find().populate({
        path: 'user',
        populate: {
          path: 'role',
        },
      });

      for (const client of allClients) {
        const emailOptions = {
          to: client.user.email,
          subject: 'Offre de remise',
          templateFileName: 'special-offer',
          content: {
            client: client.firstName,
            serviceName: serviceName.nom,
            remise: remise,
            finalValue: finalValue,
          },
        };
        try {
            const result = await sendEmailAsFunction(emailOptions.to, emailOptions.subject, emailOptions.templateFileName, emailOptions.content);
            console.log(result);
          } catch (error) {
            console.error(error);
          }
      }

      return res.status(201).json({
        message: 'Offre spécial envoyée avec succès',
        service: updatedService,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
  },
};

module.exports = specialOfferController;
