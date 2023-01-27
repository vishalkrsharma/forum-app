const express = require('express');
//login user

const { signupUser, loginUser, verifyToken, logout, getUserGroup, getProfile, sendotp, verifyotp } = require('../controllers/userController');
const { authenticate } = require('../middleware/userAuth');

const router = express.Router();

//LOGIN ROUTE
router.post('/login', loginUser);

//REGISTER ROUTE
router.post('/register', signupUser);

/*VERIFY TOKEN*/
router.post('/verify', verifyToken);

/*SEND OTP*/
router.post('/sendotp', sendotp);

/*VERIFY and Delete OTP*/
router.post('/verifyotp' , verifyotp)

//logout route
router.delete('/logout', authenticate, logout);

//get groups of user
router.get('/getGroup', authenticate, getUserGroup);

//GET USER
router.get('/getProfile', authenticate, getProfile);

// EXPORT ALL THE ROUTES
module.exports = router;

//router.post('/register',upload.single('image'),signupUser)
