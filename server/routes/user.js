const express = require('express');
//login user

const { signupUser, loginUser, verifyToken } = require('../controllers/userController');

<<<<<<< HEAD
<<<<<<< HEAD
const router = express.Router();
=======
=======
>>>>>>> 43e71d9 (toast added)

const {signupUser,loginUser,verifyToken ,sendotp} = require('../controllers/userController');

const router = express.Router()

<<<<<<< HEAD
>>>>>>> e2ff713 (nodemailer)
=======
=======
const router = express.Router();
>>>>>>> 905e016 (toast added)
>>>>>>> 43e71d9 (toast added)

//LOGIN ROUTE
router.post('/login', loginUser);

//REGISTER ROUTE
router.post('/register', signupUser);

/*
 VERIFY TOKEN
 whenever the access token expires, we will send a request 
 to the backend to verify the refresh token and generate a access token
*/
<<<<<<< HEAD
<<<<<<< HEAD
router.post('/verify', verifyToken);
=======
router.post('/verify',verifyToken)
router.post('/sendotp',sendotp)

>>>>>>> e2ff713 (nodemailer)
=======
router.post('/verify',verifyToken)
router.post('/sendotp',sendotp)

=======
router.post('/verify', verifyToken);
>>>>>>> 905e016 (toast added)
>>>>>>> 43e71d9 (toast added)

// router.post('/checkemail')

//GET USER
router.get('/check', (req, res) => {
  res.status(400).json({ check: 'working' });
});

// EXPORT ALL THE ROUTES
module.exports = router;

//router.post('/register',upload.single('image'),signupUser)
