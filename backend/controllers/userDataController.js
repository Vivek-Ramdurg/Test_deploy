const userModel = require('../models/userModel');

exports.saveUserData = async (req, res) => {
  try {
    const { name, phoneNo } = req.body
    await userModel.saveUserData(req.user.userId, name, phoneNo)
    res.status(201).json({ message: 'Data saved successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' })
  }
}
