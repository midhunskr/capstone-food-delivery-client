// import { Outlet, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import toast from "react-hot-toast";

// export const UserAuth = () => {
//     const { isUserExist } = useSelector((state) => state.user);
//     const navigate = useNavigate();

//     if (!isUserExist) {
//         // toast.error("Please login first"); // Show the toast message
//         navigate("/"); // Navigate to home
//     }

//     return isUserExist ? <Outlet /> : null;
// };

import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const UserAuth = () => {
    const { isUserExist } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserExist) {
            toast.error("Please login first"); // Show the toast message
            navigate("/"); // Navigate to home
        }
    }, [isUserExist, navigate]); // Add dependencies

    return isUserExist ? <Outlet /> : null;
};




