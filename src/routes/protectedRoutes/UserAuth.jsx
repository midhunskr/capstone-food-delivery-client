import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export const UserAuth = () => {
    const { isUserExist } = useSelector((state) => state.user);
    const navigate = useNavigate();

    if (!isUserExist) {
        // toast.error("Please login first"); // Show the toast message
        navigate("/"); // Navigate to home
    }

    return isUserExist ? <Outlet /> : null;
};




