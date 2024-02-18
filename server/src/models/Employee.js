const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
  matricule: {
    type: Number,
    required: true,
    unique: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  startTime: {
    type: String,
  },

  endTime: {
    type: String,
  },
  
  isTimeDefine: {
    type: Boolean,
    default: false,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
})

const Employee = mongoose.model('Employee', EmployeeSchema)

module.exports = Employee
