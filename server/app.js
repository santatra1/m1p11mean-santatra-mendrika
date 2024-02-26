const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const Role = require('./src/models/Role')

const app = express()

app.use(bodyParser.json())

app.use(cors())

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection

db.on(
  'error',
  console.error.bind(console, 'Erreur de connexion à la base de données :'),
)
db.once('open', function () {
  console.log('Connecté à la base de données')
})

const initializeRoles = async () => {
  try {
    const roles = ['client', 'employee', 'manager']

    for (const roleName of roles) {
      await Role.findOneAndUpdate(
        { name: roleName },
        { name: roleName },
        { upsert: true, new: true },
      )
    }

    console.log('Roles initialized successfully')
  } catch (error) {
    console.error('Error initializing roles:', error)
  }
}

initializeRoles()

const routes = require('./src/routes')
app.use(routes)

const PORT = process.env.PORT || 3000
app.listen(PORT, function () {
  console.log(`Serveur en écoute sur le port ${PORT}`)
})
