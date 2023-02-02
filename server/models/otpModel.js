const mongoose = require('mongoose');
const User = require('./userModel');
const nodemailer = require('nodemailer');
const { deleteMany } = require('./userModel');

const OTPSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  // expiresAt: {
  //     type: Date,
  //     required: true,
  //     default: Date.now() + 10*60*1000
  // }
});

OTPSchema.statics.sendotp = async function (otp, email) {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw Error('email already in use');
  } else {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: 'talkdock@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: `your verification code is : ${otp}`,
      };

      transporter.sendMail(mailOptions, async function (error) {
        if (error) {
          throw Error(error);
        }
      });
    } catch (err) {
      throw Error(err);
    }
  }
  const userotp = await this.create({ email: email, otp: otp });
  console.log(userotp);
  // return userotp.expiresAt;
  return userotp;
};

OTPSchema.statics.verifyOTP = async function (otp, email) {
  const userOTP = await this.findOne({ email, otp });
  console.log(userOTP);
  if (!userOTP) {
    throw Error('Incorrect OTP');
  }
  // if (new Date().getTime() > userOTP.expiresAt.getTime()) {
  //   await this.deleteMany({ email: email });
  //   throw Error('OTP expired try again');
  // }
  await this.deleteMany({ email: email });
  const check = await this.find({ email });
  console.log(check);
  return 'Verified and removed';
};

module.exports = mongoose.model('OTP', OTPSchema);
