import { Outlet, useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";


export const AdminAuth = () => {
    const { isAdminExist, admin } = useSelector((state) => state.admin);
    const navigate = useNavigate();

    console.log(isAdminExist);
    console.log(admin);
    

    if (!isAdminExist) {
        navigate("/admin/login")
    };

    return isAdminExist ? <Outlet /> : null;
};

// import { Outlet, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import { useEffect } from "react";

// export const AdminAuth = () => {
//     // const isAdminExist = useSelector((state) => state.admin.isAdminExist)
//     const isAdminExist = useSelector((state) => state.admin.isAdminExist); // Make sure to access isAdminExist directly from admin state
//     const navigate = useNavigate();

//     console.log(isAdminExist); // This should log true or false based on admin state

//     // Navigate to login page if admin does not exist
//     useEffect(() => {
//         if (!isAdminExist) {
//             toast.error("Please login first"); // Show the toast message
//             navigate("/admin/login"); // Navigate to home
//         }
//     }, [isAdminExist, navigate])

//     return isAdminExist ? <Outlet /> : "Error: admin not authenticated"
// };


