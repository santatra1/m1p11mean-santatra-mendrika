const RendezVous = require('../models/RendezVous')
const Paiement = require('../models/Paiement')
const Client = require('../models/Client')

const rendezvousController = {
  getRdvByEmployee: async (req, res) => {
    try {
        const { employeeId, date } = req.params
        const dateRdv = new Date(date)
        const rendezvous = await RendezVous.find({ employee:employeeId, date: dateRdv }).populate("service")
        res.status(200).json(rendezvous)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
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

      if(!client){
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
