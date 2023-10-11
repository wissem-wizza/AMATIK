// import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Stack, Button, Typography,
    // MenuItem, Menu
} from '@mui/material';

// import TestMenu from './TestMenu';
import { logOut } from "../../features/auth/authSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";
import AMATIK_logo from "./AMATIK_logo.png";


// const options = [
//     'Annonce Animaux',
//     'Annonce Laine',
// ]


const Navbar = ({ setShowMenu }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { nom = null, type = null } = useSelector(selectCurrentUser) || {};
    // const [anchorEl, setAnchorEl] = useState(null);
    // const [selectedIndex, setSelectedIndex] = useState(1);
    // const open = Boolean(anchorEl);

    // const handleClickListItem = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleMenuItemClick = (event, index) => {
    //     setSelectedIndex(index);
    //     setAnchorEl(null);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    const toggleMenu = () => {
        setShowMenu((prev) => !prev);
    };

    const handleLogout = (e) => {
        e.preventDefault();

        dispatch(logOut());
        navigate("/login");
    };

    return (
        <div className="navbar" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <i
                className="bx bx-menu"
                onClick={toggleMenu}
                style={{
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
            <img
                className="logo-img"
                src={AMATIK_logo}
                alt="amatik logo"
                style={{
                    height: "54px", // starting measuring with 54 & 64 as image & nav heights
                    position: "absolute",
                    left: 0,
                    cursor: "pointer",
                }}
                onClick={() => navigate('/')}
            />
            <Stack direction="row" gap={1} >
                {/* <TestMenu/> */}
                <Button sx={{ color: "#06603a" }} onClick={() => navigate('/annonce')} >
                    Mes Annonces
                </Button>
                <Button sx={{ color: "#06603a" }} onClick={() => navigate('/annonce_laine')} >
                    Annonces Laine
                </Button>
                <Button sx={{ color: "#06603a" }} onClick={() => navigate('/ristourne')} >
                    Ristournes
                </Button>
                <Button sx={{ color: "#06603a" }} onClick={() => navigate('/part_sociale')} >
                    Part Sociale
                </Button>
            </Stack>
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
                    <i className="bx bx-log-out" onClick={handleLogout} /></Button>
            </Stack>
        </div>
    )
}

export default Navbar