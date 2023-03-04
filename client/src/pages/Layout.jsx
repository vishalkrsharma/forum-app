import React, { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';

import { Nav } from '../components/index';
import useAuthContext from '../hooks/useAuthContext';
import useUser from '../hooks/useUser';

export default function Layout() {
  const [userData, setUserData] = useState(null);
  const { getProfile } = useUser();

  async function get() {
    const { data } = await getProfile();
    setUserData(data);
  }

  useEffect(() => {
    get();
  }, []);

  return (
    <>
      <main className='mt-16 px-2 text-dark'>{userData && <Outlet context={[userData, setUserData]} />}</main>
      {userData && <Nav userData={userData} />}
    </>
  );
}
