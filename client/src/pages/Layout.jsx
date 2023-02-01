import React, { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';

import { Nav } from '../components/index';
import useAuthContext from '../hooks/useAuthContext';
import useUser from '../hooks/useUser';

export default function Layout() {
  const [userData, setUserData] = useState(null);
  const { getProfile } = useUser();
  async function get() {
    await getProfile().then((res) => {
      const { data } = res;
      setUserData(data);
    });
  }
  
  useEffect(() => {
    get();
  },[]);

  return (
    <>
      <main className='mt-16 px-2 lg:mx-96'>{userData && <Outlet context={userData} />}</main>
      {userData && <Nav userData={userData} />}
    </>
  );
}
