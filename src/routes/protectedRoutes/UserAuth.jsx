import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const UserAuth = () => {
    const { isUserExist } = useSelector((state) => state.user);
    const navigate = useNavigate();

    if (!isUserExist) {
        navigate("/"); // Navigate to home
    }

    return isUserExist ? <Outlet /> : null;
};




