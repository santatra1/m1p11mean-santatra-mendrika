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
    default:"08:00"
  },

  endTime: {
    type: String,
    default:"16:00"
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
