const express = require('express')
//login user



const {signupUser,loginUser,verifyToken} = require('../controllers/userController');

const router = express.Router()


//LOGIN ROUTE
router.post('/login',loginUser)


//REGISTER ROUTE
router.post('/register',signupUser)

/*
 VERIFY TOKEN
 whenever the access token expires, we will send a request 
 to the backend to verify the refresh token and generate a access token
*/
router.post('/verify',verifyToken)


// router.post('/checkemail')

//GET USER
router.get('/check',(req,res)=>{
    res.status(400).json({check:"working"})
})


// EXPORT ALL THE ROUTES
module.exports = router

//router.post('/register',upload.single('image'),signupUser)