const mongoose = require('mongoose')

const RendezVousSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  startHour:{
    type: Number,
    min: 0,
    max: 24,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
})

const RendezVous = mongoose.model('RendezVous', RendezVousSchema)

module.exports = RendezVous
