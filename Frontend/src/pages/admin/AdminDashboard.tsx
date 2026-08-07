import { Box, Grid, Stack, Toolbar, Typography } from "@mui/material";
import CardComponent from "../../common/CardCompo";
import PeopleIcon from "@mui/icons-material/People";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useQuery } from "@apollo/client/react";
import type { GetAllBookingsResponse, GetAllSeatsResponse, GetAllUsersResponse } from "../../datatypes/datatypes";
import { GET_ALL_SEATS } from "../../query/seat";
import LoadingCompo from "../../common/Loading";
import { GET_ALL_BOOKINGS } from "../../query/booking";
import { GET_USERS } from "../../query/user";
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const AdminDashboard = () => {

    const {userAuth} = useSelector((state: RootState) => state.userData);
    const { data: userData, loading:userLoading } = useQuery<GetAllUsersResponse>(GET_USERS);
    const { data: seatData, loading:seatLoading } = useQuery<GetAllSeatsResponse>(GET_ALL_SEATS);
    const { data:BookingData, loading:bookingLoading } = useQuery<GetAllBookingsResponse>(GET_ALL_BOOKINGS);

    if (seatLoading || bookingLoading || userLoading) return <LoadingCompo />

    const totalPassengers=userData?.getAllUsers;
    const totalSeats=seatData?.getAllSeats;
    const totalBookings=BookingData?.getAllBookings;

    const availableSeats=seatData?.getAllSeats.filter((seat)=>{
        return seat.status==="Available"
    });

    const bookedSeats=seatData?.getAllSeats.filter((seat)=>{
        return seat.status==="Booked"
    });

    const cancelledBooking=BookingData?.getAllBookings.filter((booking)=>{
        return booking.status==="Cancelled"
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
                            title="Total Passengers"
                            count={totalPassengers?.length ?? 0}
                            bgColor="#E3F2FD"
                            icon={
                                <PeopleIcon
                                    sx={{ color: "#1976D2", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <CardComponent
                            title="Total Seats"
                            count={totalSeats?.length ?? 0 }
                            bgColor="#E3F2FD"
                            icon={
                                <EventSeatIcon
                                    sx={{ color: "#1976D2", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>
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
                            title="Available Seats"
                            count={availableSeats?.length ?? 0}
                            bgColor="#E8F5E9"
                            icon={
                                <CheckCircleIcon
                                    sx={{ color: "#2E7D32", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <CardComponent
                            title="Booked Seats"
                            count={bookedSeats?.length ?? 0}
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
                            title="Cancelled Seats"
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
export default AdminDashboard;