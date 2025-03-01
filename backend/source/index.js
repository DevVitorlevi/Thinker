const express = require('express')
const cors = require('cors')
const conn = require('./database/conn')
const app = express()

// JSON
app.use(express.json())

//CORS

app.use(cors({credentials:true, origin:'http://localhost:3000'}))

// Public

app.use(express.static('public'))

// Routes
const UserRoutes = require('../source/routes/UserRoutes')

app.use('/user',UserRoutes)
app.listen(5000)