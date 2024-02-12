const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  duree: {
    type: Number,
    required: true,
  },
  commission: {
    type: Number,
    required: true,
  },

})

const Service = mongoose.model('Service', ServiceSchema)

module.exports = Service
