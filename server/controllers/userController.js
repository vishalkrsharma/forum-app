<<<<<<< HEAD
<<<<<<< HEAD
const User = require('../models/userModel');
const UserToken = require('../models/userToken');
const jwt = require('jsonwebtoken');

const createToken = (payload, _key, expire) => {
  return jwt.sign(payload, _key, expire);
};
=======
=======
>>>>>>> 43e71d9 (toast added)
const otpGenerator = require('otp-generator')
const User = require('../models/userModel')
const UserToken = require('../models/userToken')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
<<<<<<< HEAD
>>>>>>> e2ff713 (nodemailer)

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const obj = await User.login(email, password);
    console.log(obj);

    //create jwttoken

    const accessToken = createToken({ username: obj['username'], id: obj['_id'] }, process.env.SECRET_KEY, { expiresIn: '2d' });
    const refreshToken = createToken({ email: email }, process.env.REFRESH_KEY, { expiresIn: '30d' });

=======
=======
const User = require('../models/userModel');
const UserToken = require('../models/userToken');
const jwt = require('jsonwebtoken');

const createToken = (payload, _key, expire) => {
  return jwt.sign(payload, _key, expire);
};
>>>>>>> 905e016 (toast added)

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const obj = await User.login(email, password);
    console.log(obj);

    //create jwttoken

    const accessToken = createToken({ username: obj['username'], id: obj['_id'] }, process.env.SECRET_KEY, { expiresIn: '2d' });
    const refreshToken = createToken({ email: email }, process.env.REFRESH_KEY, { expiresIn: '30d' });

>>>>>>> 43e71d9 (toast added)
    //register to userToken

    const message = await UserToken.registerToken(obj, refreshToken);
    res.status(200).json({
      error: false,
      message,
      accessToken,
      refreshToken,
    });
  } catch (error) {
<<<<<<< HEAD
    res.status(400).json({ error: true, message: error.message });
=======
    res.status(400).json({ error: true, error: error.message });
>>>>>>> 43e71d9 (toast added)
  }
};
// signup user
const signupUser = async (req, res) => {
  const { email, password, username } = req.body;
  console.log(email, password, username);
  try {
    await User.signup(email, username, password);
    res.status(200).json({ error: false, message: 'Registered Successfully' });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

const verifyToken = async (req, res) => {
  const { refToken } = req.body;
  try {
    const status = UserToken.verifyToken(refToken);

    if (status) {
      jwt.verify(refToken, process.env.REFRESH_KEY, (err, user) => {
        if (err) throw Error('Cannot verify');
        const accessToken = createToken({ email: user.email, password: user.password }, process.env.SECRET_KEY, { expiresIn: '2d' });
        res.status(200).json({ error: false, message: 'Success', accessToken: accessToken });
      });
    }
<<<<<<< HEAD
<<<<<<< HEAD
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};
module.exports = { signupUser, loginUser, verifyToken };
=======
=======
>>>>>>> 43e71d9 (toast added)
}

const sendotp = async (req ,res)=>{
    const code = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets : false});
    const email  = req.body.email;
    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS
            }
        });
        
          const mailOptions = {
            from: 'talkdock@gmail.com',
            to: email,
            subject: 'Sending Email using Node.js',
            text: `your verification code is : ${code}`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              res.status(400).json({error:"Email not Sent try again}"})
            } else {
                console.log(code)
                res.status(200).json({code : generatedCode})
            }
          });
        res.status(200).json({error : false ,gencode : code })
    }catch(err){
        res.status(400).json(err)
        console.log(err)
    }
}

module.exports = {signupUser,loginUser,verifyToken ,sendotp}
<<<<<<< HEAD
>>>>>>> e2ff713 (nodemailer)
=======
=======
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};
module.exports = { signupUser, loginUser, verifyToken };
>>>>>>> 905e016 (toast added)
>>>>>>> 43e71d9 (toast added)
