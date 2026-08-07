import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useState } from "react";
import ChangePasswordModal from "./ChangePassword";

const Profile = () => {

    const [openPasswordModal, setOpenPasswordModal] = useState<boolean>(false);
    const { userAuth } = useSelector((state: RootState) => state.userData);
    console.log("in profile", userAuth)

    return (
        <Box sx={{ mt: 12, p: 3, minHeight: "100vh" }}>
            <Typography
                variant="h4"
                sx={{ mt: 5, color: '#314B5A', fontWeight: 600, textAlign: 'center' }}
            >
                My Profile
            </Typography>

            <Grid container spacing={3} sx={{ mt: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid sx={{ xs: 12, md: 12 }}>
                    <Box
                        sx={{
                            border: '2px solid black',
                            p: 4,
                            textAlign: "center",
                            width: 300
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 60,
                                height: 60,
                                bgcolor: "#314B5A",
                                fontSize: 25,
                                mx: "auto",
                                mb: 2,
                            }}
                        >
                            {userAuth?.fullName[0]?.toUpperCase()}
                        </Avatar>

                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            {userAuth?.fullName}
                        </Typography>

                        <Chip
                            label={userAuth?.role}
                            sx={{ backgroundColor: "#e0f7fa", color: "#314B5A" }}
                        />

                        <Divider sx={{ my: 3 }} />

                        <Stack spacing={2} >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ color: '#314B5A' }}>Email: </Typography>
                                <Typography>{userAuth?.email}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ color: '#314B5A' }}>Gender: </Typography>
                                <Typography>{userAuth?.gender}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ color: '#314B5A' }}>Age: </Typography>
                                <Typography>{userAuth?.age}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ color: '#314B5A' }}>Phone: </Typography>
                                <Typography>{userAuth?.phone}</Typography>
                            </Box>
                        </Stack>
                        <Divider sx={{ my: 3 }} />

                        <Button
                            variant="outlined"
                            sx={{
                                textTransform: "none",
                                borderColor: "#314B5A",
                                color: "#314B5A",
                            }}
                            onClick={() => setOpenPasswordModal(true)}
                        >
                            Change Password
                        </Button>
                        <ChangePasswordModal
                            onClose={()=>setOpenPasswordModal(false)}
                            open={openPasswordModal}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
export default Profile;