const express = require('express')
const router = express.Router()
const {authenticate} = require('../middleware/userAuth')
const { create } = require('../controllers/groupController')

router.post('/create',authenticate,create)

module.exports = router