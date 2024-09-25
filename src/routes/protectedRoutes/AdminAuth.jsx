// import { Outlet, useNavigate } from "react-router-dom";
// import {  useSelector } from "react-redux";


// export const AdminAuth = () => {
//     const { isAdminExist } = useSelector((state) => state.admin);
//     const navigate = useNavigate();

//     console.log(isAdminExist);
    

//     if (!isAdminExist) navigate("/admin/login");

//     return isAdminExist ? <Outlet /> : null;
// };

import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const AdminAuth = () => {
    const isAdminExist = useSelector((state) => state.admin.isAdminExist); // Make sure to access isAdminExist directly from admin state
    const navigate = useNavigate();

    console.log(isAdminExist); // This should log true or false based on admin state

    // Navigate to login page if admin does not exist
    if (!isAdminExist) {
        navigate("/admin/login");
        return null; // Prevent rendering anything while navigating
    }

    return <Outlet />; // Render children if admin exists
};


