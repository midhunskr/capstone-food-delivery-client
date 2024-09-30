import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AdminPostLoginHeader } from '../components/admin/AdminPostLoginHeader'
import { useDispatch, useSelector } from 'react-redux'
import { axiosInstance } from '../config/axioInstance'
import { AdminPreLoginHeader } from '../components/admin/AdminPreLoginHeader'
import { clearAdmin, saveAdmin } from '../redux/features/adminSlice'
import { Footer } from '../components/publicUsers/Footer'


export const AdminPostLoginLayout = () => {

  const { isAdminExist } = useSelector((state) => state.admin);
  // const navigate = useNavigate()
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true)

  const checkAdmin = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/user/check-user",
      });
      console.log("API Response:", response.data)
      if (response.data.role === 'admin') {
        dispatch(saveAdmin(response.data))
      } else {
        console.log("User not authenticated as 'admin'.");
        dispatch(clearAdmin())
      }

      console.log(response);
    } catch (error) {
      dispatch(clearAdmin());
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    checkAdmin();
  }, [location.pathname]);

  console.log(isAdminExist);
  

  return (
    <div>

      {isAdminExist ? <AdminPostLoginHeader /> : <AdminPreLoginHeader />}
      <Outlet />
      <Footer />

    </div>
  )
}