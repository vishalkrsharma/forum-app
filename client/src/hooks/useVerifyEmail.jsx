import React from 'react';
import nodemailer from 'nodemailer';
const sendMail = (email, uniqueString) => {
  let Transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'daredevil062001@gmail.com',
      pass: import.meta.env.VITE_NODEMAILER_PASSWORD,
    },
  });

  let mailOptions;
  let sender = 'Tech Forum';
  mailOptions = {
    from: sender,
    to: 'vishalkrsharma1234@gmail.com',
    subject: 'Email Confirmation',
    html: `Press <a href=https://localhost:3000/verify/${uniqueString}> here</a> to verify your email.
    Thanks for using Tech Forum.`,
  };

  Transport.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Confirmation email sent.');
    }
  });
};

export default function useVerifyEmail() {
  return <div>useVerifyEmail</div>;
}
