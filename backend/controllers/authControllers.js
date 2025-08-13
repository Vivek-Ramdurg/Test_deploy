const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    await userModel.createUser(username, hashedPassword)
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' })
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    const result = await userModel.findUserByUsername(username)
    const user = result.rows[0]

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key')
    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: 'Login failed' })
  }
}
