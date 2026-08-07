import {
    Box,
    Button,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useMutation, useQuery } from "@apollo/client/react";
import LoadingCompo from "../../common/Loading";
import { CANCEL_BOOKING, GET_ALL_BOOKINGS } from "../../query/booking";
import type { Booking, GetAllBookingsResponse } from "../../datatypes/datatypes";
import { useState } from "react";
import FilterModal from "../filter/FilterModal";
import { bookingColumnOptions, bookingFilterField } from "../../constants/const";
import BookingPopupModal from "../../common/BookingPopupModal";
import { toast } from "react-toastify";

const BookinManagement = () => {

    const [openFilter, setOpenFilter] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [filter, setFilter] = useState({
        fullName: '',
        seatNumber: '',
        status: '',
        gender: ''
    });

    const { data: BookingData, loading } = useQuery<GetAllBookingsResponse>(GET_ALL_BOOKINGS, {
        variables: {
            filter: {
                status: filter.status || undefined,
                fullName: filter.fullName || undefined,
                gender: filter.gender || undefined,
                seatNumber: filter.seatNumber || undefined,
            },
        },
        fetchPolicy: "network-only",
    });

    const [cancelBooking] = useMutation(CANCEL_BOOKING, {
        refetchQueries: [{ query: GET_ALL_BOOKINGS}],
    });

    if (loading) return <LoadingCompo />;

    console.log(BookingData?.getAllBookings);

    const handleCancelledBooking = async () => {
        try {
            const response = await cancelBooking({
                variables: {
                    id: selectedBooking.id
                },
            });
            console.log(response);
            toast.success("Booking has been cancelled successfully.");
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setConfirmOpen(false);
        }
    };

    return (
        <>
            <Box sx={{ mt: 15, padding: 2 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "stretch", sm: "center" },
                        gap: 1.5,
                        mb: 2.5,
                        marginTop: 5,
                    }}
                >
                    <Typography variant="h5" sx={{ color: "#314B5A", fontWeight: 600 }}>
                        All Booking Details
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Button
                            variant="outlined"
                            startIcon={<FilterListIcon />}
                            sx={{ color: '#314B5A' }}
                            onClick={() => setOpenFilter(true)}
                        >
                            Filter
                        </Button>
                    </Box>
                </Box>
                <TableContainer
                    sx={{
                        backgroundColor: "#ffffff",
                        borderRadius: 2,
                        width: "100%",
                        overflowX: "auto",
                    }}
                >
                    <Table sx={{ backgroundColor: "#ffffff", width: "100%", minWidth: 1200, tableLayout: "fixed" }}>
                        <TableHead sx={{ backgroundColor: "#314B5A", color: 'white', padding: 10 }}>
                            <TableRow sx={{ color: 'white' }}>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>S.No.</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Passenger</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Seat Number</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Gender</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Status</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Phone</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Booked At</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ backgroundColor: "#ffffff" }}>
                            {
                                BookingData?.getAllBookings?.map((booking: Booking, index: number) => {
                                    return (
                                        <TableRow
                                            hover
                                            key={booking.id}
                                            sx={{ backgroundColor: "#ffffff", "&:last-child td": { borderBottom: "none" }, border: '1px solid #314B5A' }}
                                        >
                                            <TableCell align="center" sx={{ border: '1px solid #314B5A' }}>{index + 1}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #314B5A' }}>{booking?.user?.fullName}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #314B5A' }}>{booking?.seat?.seatNumber}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #314B5A' }}>{booking?.user?.gender}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #314B5A' }}>
                                                <Chip
                                                    label={booking.status}
                                                    color={booking.status === "Confirmed" ? "success" : "error"}
                                                />
                                            </TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #314B5A' }}>{booking?.user?.phone}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #314B5A' }}>
                                                {new Date(Number(booking.createdAt)).toLocaleString("en-IN", {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric'
                                                })}
                                            </TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #314B5A' }}>
                                                <Button variant="outlined"
                                                    sx={{ color: '#426F7F' }}
                                                    disabled={booking.status === "Cancelled" ? true : false}
                                                    onClick={() => {
                                                        setConfirmOpen(true);
                                                        setSelectedBooking(booking);
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <BookingPopupModal
                    open={confirmOpen}
                    title="Cancel Booking"
                    message="Are you sure you want to cancel this booking?"
                    onConfirm={handleCancelledBooking}
                    onCancel={() => setConfirmOpen(false)}
                />
                <FilterModal
                    open={openFilter}
                    onClose={() => setOpenFilter(false)}
                    setOpenFilter={setOpenFilter}
                    setFilter={setFilter}
                    filter={filter}
                    filterField={bookingFilterField}
                    columnOptions={bookingColumnOptions}
                />
            </Box>
        </>
    )
}
export default BookinManagement;