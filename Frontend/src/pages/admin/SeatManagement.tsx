import { Box, Button, Stack, Typography, type SelectChangeEvent } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client/react';
import { GET_ALL_SEATS } from '../../query/seat';
import type { GetAllBookingsResponse, GetAllSeatsResponse, SearchType, SeatStatus } from '../../datatypes/datatypes';
import SeatGrid from '../../common/SeatGrid';
import LoadingCompo from '../../common/Loading';
import { useState } from 'react';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import BookingPopupModal from '../../common/BookingPopupModal';
import { GET_ALL_BOOKINGS, RESET_ALL_BOOKING } from '../../query/booking';
import { toast } from 'react-toastify';
import SearchForm from '../../common/SearchForm';

const SeatManagement = () => {

    const { data: BookingData, loading: bookingLoading } = useQuery<GetAllBookingsResponse>(GET_ALL_BOOKINGS);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [searchBy, setSearchBy] = useState<SearchType>("status");
    const [searchValue, setSearchValue] = useState<SeatStatus | "">("");

    const { data: seatData, loading: seatLoading, refetch: refetchSeats } = useQuery<GetAllSeatsResponse>(GET_ALL_SEATS);

    const [resetAllBooking] = useMutation(RESET_ALL_BOOKING,
        {
            refetchQueries: [{ query: GET_ALL_SEATS }],
            variables: {
                status: searchValue || undefined
            }
        }
    );

    if (seatLoading || bookingLoading) return <LoadingCompo />

    const handleResetBooking = async () => {
        try {
            const response = await resetAllBooking();
            if (response) {
                toast.success("All bookings has been reset successfully.");
                setConfirmOpen(false);
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

   const handleSearchByChange = (event: SelectChangeEvent<string>):void => {
        setSearchBy(event.target.value as SearchType);
        setSearchValue("");
    };

    const handleSearch = async () => {
        await refetchSeats({
            status:
                searchBy === "status" && searchValue
                    ? (searchValue as SeatStatus)
                    : undefined,

            seatNumber:
                searchBy === "seatNumber" && searchValue
                    ? searchValue
                    : undefined,
        });
    };

    return (
        <>
            <Box sx={{ mt: 10, padding: 5 }}>
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
                        Check seat Details
                    </Typography>
                    <SearchForm
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        searchBy={searchBy}
                        handleSearchByChange={handleSearchByChange}
                        handleSearch={handleSearch}
                        setSearchBy={setSearchBy}
                    />
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Button
                            variant="outlined"
                            startIcon={<AutorenewIcon />}
                            sx={{ color: '#314B5A' }}
                            onClick={() => setConfirmOpen(true)}
                        >
                            Reset All Bookings
                        </Button>
                    </Box>
                </Box>
                <Stack direction={'row'} sx={{ flexWrap: "wrap", mt: 5, gap: 3.5, border: '5px solid #314B5A', padding: 3 }}>
                    {
                        seatData?.getAllSeats?.map((seat) => {
                            console.log('seat id : ', seat.id);
                            const bookedSeatData = BookingData?.getAllBookings?.filter((booking) => {
                                return booking.seat.id === seat.id
                            });
                            
                            return (
                                <SeatGrid
                                    key={seat.id}
                                    status={seat.status}
                                    seatNumber={seat.seatNumber}
                                    bookedSeatData={bookedSeatData}
                                />
                            )
                        })
                    }
                </Stack>
                <BookingPopupModal
                    open={confirmOpen}
                    title="Reset All Booking"
                    message="Are you sure you want to reset all booking?"
                    onConfirm={handleResetBooking}
                    onCancel={() => setConfirmOpen(false)}
                />
            </Box>
        </>
    );
}
export default SeatManagement;  