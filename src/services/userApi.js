import toast from "react-hot-toast"
import { axiosInstance } from "../config/axioInstance"
import Cookies from 'js-cookie'

export const userLogin = async(data)=>{

    try {
        const response = await axiosInstance({
            url: '/user/login',
            method: 'POST',
            data,
            withCredentials: true
        })
        console.log("response==============",response);
        
        return response?.data
    } catch (error) {
        console.log(error);        
    }
}

export const userSignUp = async(data)=>{
    try {
        const response = await axiosInstance({
            url: '/user/register',
            method: 'POST',
            data,
            withCredentials: true
        })
        console.log("=============response", response);
        
        return response?.data
    } catch (error) {
        console.log(error);        
    }
}

export const updateUser = async (userData) => {
    try {
      const response = await axiosInstance.put("/user/update", userData, { withCredentials: true });
      return response.data; // Return the response from the backend
    } catch (error) {
      console.error("Error updating user:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };

export const userLogout = async (setUser, navigate, dispatch) => {
    try {
        const response = await axiosInstance({
            url: '/user/logout',
            method: 'POST',
            withCredentials: true
        });
        console.log('Response:', response.data)
        window.location.reload()
        localStorage.removeItem('authToken', token) // Remove the token from local storage
        setUser(null); // Clear user state
        dispatch(clearUser())
        sessionStorage.clear()
        Cookies.remove('__vercel_live_token')
        Cookies.remove('__vercel_toolbar') 
        navigate('/')

        return response?.data;
    } catch (error) {
        // toast.error('Logout Failed');
        console.log(error);
    }
}

// export const fetchUserProfile = async () => {
//     try {
//         const response = await axiosInstance({
//             url: '/user/profile',
//             method: 'GET',
//             withCredentials: true
//         })

//         console.log(response, '==============response');
//         return response?.data
        
//     } catch (error) {
//         console.log('Error fetching user data');
//         toast.error('Error fetching user data')
//     }
// }

export const adminLogin = async(data)=>{
    try {
        const response = await axiosInstance({
            url: '/user/login',
            method: 'POST',
            data,
            withCredentials: true
        })        
        return response?.data
    } catch (error) {
        console.log(error);        
    }
}

export const adminSignUp = async(data)=>{
    try {
        const response = await axiosInstance({
            url: 'user/register',
            method: 'POST',
            data,
            withCredentials: true
        })      
        return response?.data
    } catch (error) {
        console.log(error);        
    }
}

export const adminLogout = async () => {
    try {
        const response = await axiosInstance({
            url: '/user/logout',
            method: 'POST',
            withCredentials: true
        })
        console.log(response);      
        return response?.data
    } catch (error) {
        toast.error('Logout Failed')
        console.log(error);      
    }
}