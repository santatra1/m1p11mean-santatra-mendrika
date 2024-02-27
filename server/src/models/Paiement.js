const mongoose = require('mongoose')

const PaiementSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  cardNumber:{
    type: Number,
    required: true
  },
  rendezVous: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RendezVous',
    required: true,
  },
})

const Paiement = mongoose.model('Paiement', PaiementSchema)

module.exports = Paiement
