import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Stack, Button, Typography } from '@mui/material';

import { logOut } from "../../features/auth/authSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";
import AMATIK_logo from "./AMATIK_logo.png";


const Navbar = ({ setShowMenu }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { nom = null, type = null } = useSelector(selectCurrentUser) || {};

    const toggleMenu = () => {
        setShowMenu((prev) => !prev);
    };

    const handleLogout = (e) => {
        e.preventDefault();

        dispatch(logOut());
        navigate("/login");
    };

    return (
        <div className="navbar">
            {
                type === "Eleveur"
                ? null
                : <i
                    className="bx bx-menu"
                    onClick={toggleMenu}
                    style={{
                        // position: `${type === "Superviseur" ? "absolute" : "static"}`,
                        position: "absolute",
                        left: 0,
                        top: "7px",
                        bottom: "7px",
                        fontSize: "30px",
                        height: "50px",
                        maxHeight: "50px",
                        width: "78px",
                        minWidth: "78px",
                        textAlign: "center",
                        lineHeight: "50px",
                        cursor: "pointer",
                        color: "#06603a",
                    }}
                />
            }
            <img
                className="logo-img"
                src={AMATIK_logo}
                alt="amatik logo"
                style={{
                    height: "54px", // starting measuring with 54 & 64 as image & nav heights
                    position: "absolute",
                    top: "3px", // != bottom, as some white space on top 
                    bottom: "5px", // (64 - 54) / 2
                    left: "clac(50% - 58px)", // width is auto resolved to 116 -> 58 * 2
                    right: "calc(50% - 58px)", // same
                    visibility: `${type === "Eleveur" ? "hidden" : ""}`,
                    cursor: "pointer"
                }}
                onClick={() => navigate('/')}
            />
            <Stack direction="row" gap={1} style={{
                position: "absolute",
                right: 0,
            }}>
                <Button color="success">
                    <Stack direction="column">
                        <Typography
                            variant="h5"
                            sx={{ fontSize: "1.2rem", color: "#06603a", fontWeight: 500 }}
                        >
                            {nom}
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{ fontSize: "0.8rem", color: "#06603a", fontWeight: 500 }}
                        >
                            {type}
                        </Typography>
                    </Stack>
                </Button>
                <Button sx={{ color: "#06603a", fontSize: "1.8rem" }}>
                    <i className="bx bx-log-out" onClick={handleLogout} />
                </Button>
            </Stack>
        </div>
    )
}

export default Navbar