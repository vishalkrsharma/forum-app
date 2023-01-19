import React from 'react';

import logo from '../assets/logo.png';

export default function VerifyEmail(props) {
  const baseUrl = import.meta.env.VITE_TECHHELP_URL || '';

  const { name, email, verifyUrl } = { name: 'vishal', email: 'email', verifyUrl: 'url' };

  return (
    <div
      className='flex flex-col justify-center items-center gap-10 p-5 border- border-diffused rounded-lg mx-auto m-5'
      style={{ width: '30rem', borderWidth: '1px' }}
    >
      <a href={baseUrl}>
        <img className='h-20' src={logo} alt={logo} />
      </a>
      Hello {name}({email}),
      <br />
      Please click the following button to verify your email.
      <br />
      <button className='bg-primary text-white px-5 py-3 rounded-lg'>
        <a href={verifyUrl}>Join Tech Help</a>
      </button>
      <br />1 or copy and paste this URL into your browser: {verifyUrl}
      <div className='line border-diffused' style={{ height: '1px', width: '105%', borderTopWidth: '.5px' }}></div>
      <div className='text-sm text-dark'>
        This invitation was intended for <span className='text-black'>{name}</span>. If you were not expecting this invitation, you can ignore this email. If
        you are concerned about your account's safety, please reply to this email to get in touch with us.
      </div>
    </div>
  );
}
