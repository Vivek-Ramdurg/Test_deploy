const express = require('express')
const router = express.Router()
const userDataController = require('../controllers/userDataController')
const authenticateToken = require('../middleware/authenticateToken')

router.post('/', authenticateToken, userDataController.saveUserData)

module.exports = router
