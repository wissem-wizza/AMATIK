import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Breadcrumbs, Typography, Link } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';


const Header = ({ currentPageProps = {} }) => {

    const { menus, label, parentPath, documentTitle } = currentPageProps;
    const navigate = useNavigate();

    useEffect(() => {
        document.title = documentTitle
    }, [documentTitle])

    if (currentPageProps.notFound) return null
    return (
        <Stack direction="column" justifyContent="center" alignItems="flex-start">
            {label && <Typography variant="h4" sx={{ color: "#030" }}>{label}</Typography>}
            <Breadcrumbs sx={{ marginBottom: "20px" }} aria-label="breadcrumb">
                [
                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                        key="1"
                        color="inherit"
                        onClick={(e) => {
                            e.preventDefault()
                            navigate("/")
                        }}
                    >
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />page d'accueil
                    </Link>,
                    <Link
                        underline="hover"
                        key="2"
                        color="inherit"
                        sx={{cursor: 'pointer'}}
                        onClick={(e) => {
                            e.preventDefault()
                            if(parentPath) {
                                navigate(parentPath)
                            }
                        }}
                    >
                        {menus.menu}
                    </Link>,
                    <Typography key="3" color="text.primary">
                        {menus.subMenu}
                    </Typography>
                ]
            </Breadcrumbs>
        </Stack>
    )
}

export default Header