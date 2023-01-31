import {Navigate, Outlet, useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

export default function RequireAuth() {
  const {user} = useAuthContext();
  return (
    <>
       {user ? <Outlet /> : <Navigate to= "/login"/> }  
    </>
  );
}
