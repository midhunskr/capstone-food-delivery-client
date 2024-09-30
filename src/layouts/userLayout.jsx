import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { UserHeader } from '../components/user/userHeader'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from '../components/publicUsers/Header'
import { axiosInstance } from '../config/axioInstance'
import { clearUser, saveUser } from '../redux/features/userSlice'
import { Footer } from '../components/publicUsers/Footer'
import { UserAuth } from '../routes/protectedRoutes/UserAuth'

export const UserLayout = () => {
  const { isUserExist, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  // const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/user/check-user",
      });
      dispatch(saveUser(response.data));
    } catch (error) {
      dispatch(clearUser());
      console.log(error);
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

