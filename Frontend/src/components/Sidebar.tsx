import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import Typography from '@mui/material/Typography';
import DashboardIcon from "@mui/icons-material/Dashboard";
import { NavLink } from 'react-router-dom';
import type { NavbarProps } from "../datatypes/datatypes";
import PeopleIcon from "@mui/icons-material/People";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import type { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const Sidebar = ({ mobileOpen, setMobileOpen, drawerWidth }: NavbarProps) => {

    const { userAuth } = useSelector((state: RootState) => state.userData);

    console.log("full name : ", userAuth?.fullName);

    const drawer = (
        <>
            <Box sx={{ width: 300 }}>
                <Toolbar sx={{ height: 100 }}>
                    <Typography variant="h4" color="initial" sx={{ fontWeight: 700, color: '#314B5A' }}>FlightFlow</Typography>
                </Toolbar>
                <Divider />
                <List sx={{ mt: 5 }}>
                    <NavLink
                        to="/dashboard"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        {({ isActive }) => (
                            <ListItemButton
                                selected={isActive}
                                className="show-active-style"
                            >
                                <ListItemIcon>
                                    <DashboardIcon sx={{ color: !isActive ? '#314B5A' : "white" }} />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        )}
                    </NavLink>
                    {userAuth?.role == 'Admin' && (
                        <>
                            <NavLink
                                to='/user-management'
                                style={{ textDecoration: "none", color: "inherit", }}
                            >
                                {({ isActive }) => (
                                    <ListItemButton
                                        selected={isActive}
                                        className="show-active-style"
                                    >
                                        <ListItemIcon>
                                            <PeopleIcon sx={{ color: !isActive ? '#314B5A' : "white" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="User Management" />
                                    </ListItemButton>
                                )}
                            </NavLink>

                            <NavLink to='/seats-management'
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                {({ isActive }) => (
                                    <ListItemButton
                                        selected={isActive}
                                        className="show-active-style"
                                    >
                                        <ListItemIcon>
                                            <EventSeatIcon sx={{ color: !isActive ? '#314B5A' : "white" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Seat Management" />
                                    </ListItemButton>
                                )}
                            </NavLink>

                            <NavLink to='/booking-management'
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                {({ isActive }) => (
                                    <ListItemButton
                                        selected={isActive}
                                        className="show-active-style"
                                    >
                                        <ListItemIcon>
                                            <ConfirmationNumberIcon sx={{ color: !isActive ? '#314B5A' : "white" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Booking Management" />
                                    </ListItemButton>
                                )}
                            </NavLink>
                        </>
                    )}

                    {userAuth?.role == 'Passenger' && (
                        <>
                            <NavLink
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                to='check-seats'
                            >
                                {({ isActive }) => (
                                    <ListItemButton
                                        selected={isActive}
                                        className="show-active-style"
                                    >
                                        <ListItemIcon>
                                            <EventSeatIcon sx={{ color: !isActive ? '#314B5A' : "white" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Show Seats" />
                                    </ListItemButton>
                                )}
                            </NavLink>

                            <NavLink
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                to='my-bookings'
                            >
                                {({ isActive }) => (
                                    <ListItemButton
                                        selected={isActive}
                                        className="show-active-style"
                                    >
                                        <ListItemIcon>
                                            <BookOnlineIcon sx={{ color: !isActive ? '#314B5A' : "white" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="My Booking" />
                                    </ListItemButton>
                                )}
                            </NavLink>
                        </>
                    )}
                </List>
            </Box>
        </>
    );
    return (
        <>
            <Box
                component="nav"
                sx={{
                    width: { md: drawerWidth },
                    flexShrink: { md: 0 },
                }}
            >

                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>

                <Drawer
                    variant="permanent"
                    open
                    sx={{
                        display: { xs: "none", md: "block" },
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    )
}
export default Sidebar;
