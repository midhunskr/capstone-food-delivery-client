import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { UserHeader } from '../components/user/userHeader'
import { UserFooter } from '../components/user/UserFooter'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from '../components/publicUsers/Header'
import { axiosInstance } from '../config/axioInstance'
import { clearUser, saveUser } from '../redux/features/userSlice'
import { Footer } from '../components/publicUsers/Footer'

export const UserLayout = () => {
  const { isUserExist } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/user/check-user",
      });      
      dispatch(saveUser());
      setLoading(false);
    } catch (error) {
      dispatch(clearUser());
      console.log(error);
    } finally {
      setLoading(false)
    }
  };
  

  useEffect(() => {
    checkUser();
  }, [location.pathname]);
  return loading ? null : (
    <div>

      {isUserExist ? <UserHeader /> : <Header />}
      <Outlet />
      <Footer />

    </div>
  )
}