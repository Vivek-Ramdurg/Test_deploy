const express = require('express')
const cors = require('cors')
require('dotenv').config()

const userModel = require('./models/userModel')
const authRoutes = require('./routes/authRoutes')
const userDataRoutes = require('./routes/userDataRoutes')

const app = express()

app.use(cors())
app.use(express.json())

// DB Setup
userModel.createTables()

// Routes
app.use('/api', authRoutes)
app.use('/api/user-data', userDataRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
