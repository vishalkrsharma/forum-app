const User = require('../models/userModel');
const UserToken = require('../models/userToken');
const jwt = require('jsonwebtoken');

const createToken = (payload, _key, expire) => {
  return jwt.sign(payload, _key, expire);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const obj = await User.login(email, password);
    console.log(obj);

    //create jwttoken

    const accessToken = createToken({ username: obj['username'], id: obj['_id'] }, process.env.SECRET_KEY, { expiresIn: '2d' });
    const refreshToken = createToken({ email: email }, process.env.REFRESH_KEY, { expiresIn: '30d' });

    //register to userToken

    const message = await UserToken.registerToken(obj, refreshToken);
    res.status(200).json({
      error: false,
      message,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(400).json({ error: true, error: error.message });
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
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};
module.exports = { signupUser, loginUser, verifyToken };
