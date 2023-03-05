const otpGenerator = require('otp-generator');
const User = require('../models/userModel');
const Token = require('../models/userToken');
const jwt = require('jsonwebtoken');

const OTP = require('../models/otpModel');

const createToken = (payload, _key, expire) => {
  return jwt.sign(payload, _key, expire);
};

//LOGIN USER

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const obj = await User.login(email, password);

    //create jwttoken

    const accessToken = createToken({ username: obj['username'], id: obj['id'] }, process.env.SECRET_KEY, { expiresIn: '2d' });
    const refreshToken = createToken({ email: email }, process.env.REFRESH_KEY, { expiresIn: '30d' });

    //register to userToken

    const message = await Token.registerToken(obj['id'], refreshToken);
    res.status(200).json({
      error: false,
      message,
      accessToken,
      username: obj['username'],
      refreshToken,
    });
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

// SIGNUP USER
const signupUser = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    await User.signup(email, username, password);
    res.status(200).json({ error: false, message: 'Registered Successfully' });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

/*
    THIS VERIFY TOKEN FUNTION VERIFIES THE REFRESH TOKEN SEND FROM THE CLIENT 
    AND CHECKS IF IT IS PRESENT IN THE TOKEN TABLE IF YES THEN IT RETURNS AN ACCESS
    TOKEN TO THE USER OR ELSE IT WILL STATE THAT THE USER HAS LOGGED

    USUALLY THIS IS INVOKED WHEN THE ACCESS TOKEN EXPIRES AND A REQUEST IS SENT TO 
    GENERATE THE ACCCESS TOKEN 
*/

const verifyToken = async (req, res) => {
  const { refToken } = req.body;
  try {
    const status = UserToken.verifyToken(refToken);

    if (status) {
      jwt.verify(refToken, process.env.REFRESH_KEY, (err, user) => {
        if (err) throw Error('Cannot verify');
        const accessToken = createToken({ email: user.username, password: user.id }, process.env.SECRET_KEY, { expiresIn: '2d' });
        res.status(200).json({ error: false, message: 'Success', accessToken: accessToken });
      });
    }
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

const sendotp = async (req, res) => {
  const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
  const email = req.body.email;
  try {
    const expiresAt = await OTP.sendotp(otp, email);
    res.status(200).json({ error: false, expiresAt: expiresAt });
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

const verifyotp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const resp = await OTP.verifyOTP(otp, email);
    console.log(resp);
    res.status(200).json({ error: false });
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

/* 
    GETUSERGROUP RETURNS THE LIST OF GROUP ID'S AND NAME'S 
*/
const getUserGroup = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const data = jwt.decode(token, true);
  const userId = data['id'];
  console.log(data);
  try {
    const groups = await User.getUserGroups(userId);
    res.status(200).json({ error: false, groups: groups });
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

/*
    LOGOUT THE CURRENT USER BY DELETING THEIR REFRESH TOKEN
*/
const logout = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const data = jwt.decode(token, true);
  const userId = data['id'];
  try {
    await Token.deleteToken(userId);
    res.status(200).json({ error: false, message: 'Logged Out Successfully' });
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

/*
    TO GET THE PROFILE OF THE USER 
*/
const getProfile = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const data = jwt.decode(token, true);
  const username = data['username'];

  try {
    const data = await User.profile(username);
    res.status(200).json({ error: false, message: 'Success', data: data });
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

module.exports = { signupUser, loginUser, verifyToken, logout, getUserGroup, getProfile, sendotp, verifyotp };
