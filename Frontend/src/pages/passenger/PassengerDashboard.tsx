import { Box, Grid, Stack, Toolbar, Typography } from "@mui/material";
import CardComponent from "../../common/CardCompo";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useQuery } from "@apollo/client/react";
import type {GetMyBookingsResponse } from "../../datatypes/datatypes";
import LoadingCompo from "../../common/Loading";
import {MY_BOOKING } from "../../query/booking";
import LockIcon from '@mui/icons-material/Lock';
import CancelIcon from '@mui/icons-material/Cancel';

const PassengerDashboard = () => {

    const {userAuth} = useSelector((state: RootState) => state.userData);
    const { data:BookingData, loading:bookingLoading } = useQuery<GetMyBookingsResponse>(MY_BOOKING);

    if (bookingLoading) return <LoadingCompo />
 
    const totalBookings=BookingData?.myAllBookings.filter((booking)=>{
        return booking.user.id===userAuth?.id
    });

    const cancelledBooking=BookingData?.myAllBookings.filter((booking)=>{
        return booking.status==="Cancelled" && booking.user.id===userAuth?.id
    });

    const confirmedBooking=BookingData?.myAllBookings.filter((booking)=>{
        return booking.status==="Confirmed" && booking.user.id===userAuth?.id
    });

    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
                <Toolbar />
                <Stack direction={'row'} spacing={2}>
                    <Typography variant="h4" sx={{ fontWeight: 600, display: 'flex' }}> Welcome </Typography>
                    <Typography variant="h4" sx={{ color: '#426F7F', fontWeight: 600 }}>{userAuth?.fullName}</Typography>
                </Stack>
                <Grid container spacing={3} sx={{ mt: 5 }}>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <CardComponent
                            title="Total Bookings"
                            count={totalBookings?.length ?? 0}
                            bgColor="#E8F5E9"
                            icon={
                                <ConfirmationNumberIcon
                                    sx={{ color: "#2E7D32", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <CardComponent
                            title="Confirmed Booked"
                            count={confirmedBooking?.length ?? 0}
                            bgColor="#E8F5E9"
                            icon={
                                <LockIcon
                                    sx={{ color: "#2E7D32", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <CardComponent
                            title="Cancelled Booking"
                            count={cancelledBooking?.length ?? 0}
                            bgColor="#E8F5E9"
                            icon={
                                <CancelIcon
                                    sx={{ color: "#2E7D32", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
export default PassengerDashboard;