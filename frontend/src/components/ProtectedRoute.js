import React from "react";
import {
    Navigate,
    Outlet,
    useLocation,
} from "react-router-dom";

const ProtectedRoute = ({ pass, redirectTo = "/login", ...navProps }) => {
    const location = useLocation();
    if (!pass)
        console.log("*****navigating from:", location.pathname, "to:", redirectTo);

    return pass ?
    <Outlet /> :
    <Navigate
        {...navProps}
        to={redirectTo}
        replace // it's a must, otherwise going back will be painful
    />;
};

export default ProtectedRoute;
