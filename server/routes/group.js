const express = require('express')
const router = express.Router()
const {authenticate} = require('../middleware/userAuth')
const { create ,getGroup,join,leave,getUserGroups,searchGroup } = require('../controllers/groupController')

router.post('/create',authenticate,create)

router.get('/getById/:groupId',authenticate,getGroup)

router.get('/getUserGroups',authenticate,getUserGroups)

router.post('/join',authenticate,join)

router.post('/leave',authenticate,leave)

router.post('/search',authenticate,searchGroup)


module.exports = router