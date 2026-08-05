import { useState } from "react";
import {
    AppBar,
    Avatar,
    Box,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from 'react-router-dom';
import type { NavbarProps } from "../datatypes/datatypes";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const Navbar = ({ setMobileOpen, drawerWidth }: NavbarProps) => {

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const navigate = useNavigate();
    const { userAuth } = useSelector((state: RootState) => state.userData);

    console.log("full name : ", userAuth?.fullName);

    const open = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {

    }

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
                bgcolor: "#314B5A",
            }}
        >
            <Toolbar
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    height: '10vh',
                }}
            >
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={() => setMobileOpen(true)}
                    sx={{
                        mr: 2,
                        display: { md: "none" },
                        alignItems: 'center'
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />

                <IconButton onClick={handleOpen} >
                    <Avatar
                        sx={{
                            bgcolor: "#fff",
                            color: "#314B5A",
                            fontWeight: "bold",
                        }}
                    >
                        {userAuth?.fullName[0].toUpperCase()}
                    </Avatar>
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}>
                    <Box sx={{ px: 2, py: 1 }}>
                        <Typography>{userAuth?.fullName}</Typography>
                        <Typography variant="body2" color="text.secondary">{userAuth?.email}</Typography>
                    </Box>
                    <Divider />

                    <MenuItem onClick={() => {
                        navigate('/profile')
                    }}>
                        <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
                        Profile
                    </MenuItem>
                    <Divider />

                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};
export default Navbar;