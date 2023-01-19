const express = require('express')

//controller functions 
const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid');
//login user



const {signupUser,loginUser,verifyToken} = require('../controllers/userController');

const router = express.Router()

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'media/user');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({storage,fileFilter})

//login route
router.post('/login',loginUser)
//signup route
//router.post('/register',upload.single('image'),signupUser)
router.post('/register',signupUser)
//verify token
router.post('/verify',verifyToken)
// router.post('/checkemail')
router.get('/check',(req,res)=>{
    res.status(400).json({check:"working"})
})
module.exports = router