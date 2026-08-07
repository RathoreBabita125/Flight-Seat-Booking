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
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import LoadingCompo from "../../common/Loading";
import type { Booking, BookingFilter, GetMyBookingsResponse } from "../../datatypes/datatypes";
import { CANCEL_BOOKING, MY_BOOKING } from "../../query/booking";
import { toast } from "react-toastify";
import BookingPopupModal from "../../common/BookingPopupModal";
import FilterModal from "../filter/FilterModal";
import { myBookingColumnOptions, myBookingFilterField } from "../../constants/const";

const MyBooking = () => {

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selecetedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [openFilter, setOpenFilter] = useState(false);
    const [filter, setFilter] = useState<BookingFilter>({
        seatNumber: "",
        status: ""
    });

    const { data: bookingData, loading: bookingLoading } = useQuery<GetMyBookingsResponse>(MY_BOOKING, {
        variables: {
            filter: {
                status: filter.status || undefined,
                seatNumber: filter.seatNumber || undefined,
            },
        },
        fetchPolicy: "network-only",
    });

    const [cancelBooking] = useMutation(CANCEL_BOOKING, {
        refetchQueries: [{ query: MY_BOOKING }],
    });

    if (bookingLoading) return <LoadingCompo />;

    const handleConfirmCancel = async () => {
        try {
            const response = await cancelBooking({
                variables: {
                    id: selecetedBooking?.id
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
                        All Seat Details
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
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Seat Number</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Seat Status</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Booking Status</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Name</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Phone</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ backgroundColor: "#ffffff" }}>
                            {
                                bookingData?.myAllBookings?.map((booking: Booking, index: number) => {
                                    return (
                                        <TableRow
                                            hover
                                            key={booking.id}
                                            sx={{ backgroundColor: "#ffffff", "&:last-child td": { borderBottom: "none" }, border: '1px solid #314B5A' }}
                                        >
                                            <TableCell align="center" sx={{ border: '1px solid #314B5A' }}>{index + 1}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #314B5A' }}>{booking.seat.seatNumber}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #314B5A' }}>
                                                <Chip
                                                    label={booking.seat.status}
                                                    color={booking.seat.status === "Booked" ? "secondary" : "info"}
                                                />
                                            </TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #314B5A' }}>
                                                <Chip
                                                    label={booking.status}
                                                    color={booking.status === "Confirmed" ? "success" : "error"}
                                                />
                                            </TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #314B5A' }}>{booking.user.fullName}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #314B5A' }}>{booking.user.phone}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #314B5A' }}>
                                                <Button
                                                    variant="outlined"
                                                    sx={{ color: '#314B5A' }}
                                                    onClick={
                                                        () => {
                                                            setConfirmOpen(true);
                                                            setSelectedBooking(booking);
                                                        }
                                                    }
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
                    message="Are you sure you want to cancel this booking? This action cannot be undone."
                    onConfirm={handleConfirmCancel}
                    onCancel={() => setConfirmOpen(false)}
                />
                <FilterModal
                    open={openFilter}
                    onClose={() => setOpenFilter(false)}
                    setOpenFilter={setOpenFilter}
                    setFilter={setFilter}
                    filter={filter}
                    filterField={myBookingFilterField}
                    columnOptions={myBookingColumnOptions}
                />
            </Box>
        </>
    )
}
export default MyBooking;