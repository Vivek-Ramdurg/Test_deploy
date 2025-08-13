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


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio server running at http://0.0.0.0:${PORT}`);
});