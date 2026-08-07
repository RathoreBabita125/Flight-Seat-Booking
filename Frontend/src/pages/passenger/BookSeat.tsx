import { Box, Button, Stack, Typography, type SelectChangeEvent } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client/react';
import { GET_ALL_SEATS } from '../../query/seat';
import type { GetAllSeatsResponse, SearchType, SeatStatus } from '../../datatypes/datatypes';
import SeatGrid from '../../common/SeatGrid';
import LoadingCompo from '../../common/Loading';
import FlightIcon from '@mui/icons-material/Flight';
import BookingPopupModal from '../../common/BookingPopupModal';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { AUTO_ASSIGN_SEAT, MY_BOOKING } from '../../query/booking';
import SearchForm from '../../common/SearchForm';

const BookSeat = () => {

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [searchBy, setSearchBy] = useState<SearchType>("status");
    const [searchValue, setSearchValue] = useState<"" | SeatStatus>("");

    const [autoAssignSeat] = useMutation(AUTO_ASSIGN_SEAT, {
        refetchQueries: [MY_BOOKING],
        variables: {
            status: searchValue === "" ? undefined : searchValue,
        }
    });

    const { data: seatData, loading: seatLoading, refetch: refetchSeats } = useQuery<GetAllSeatsResponse>(GET_ALL_SEATS);

    if (seatLoading) return <LoadingCompo />

    const handleConfirmBooking = async () => {
        try {
            const { data } = await autoAssignSeat();
            console.log(data);
            toast.success("Auto-seat has been booked successfully.");
            setConfirmOpen(false);
        } catch (error) {
            toast.error((error as Error).message)
        }
    };

    const handleSearchByChange = (event: SelectChangeEvent) => {
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
                        Book Seat Now
                    </Typography>
                    <SearchForm
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        searchBy={searchBy}
                        handleSearchByChange={handleSearchByChange}
                        handleSearch={handleSearch}
                    />
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Button
                            variant="outlined"
                            startIcon={<FlightIcon />}
                            sx={{ color: '#314B5A' }}
                            onClick={() => setConfirmOpen(true)}
                        >
                            Auto Seat Booking
                        </Button>
                    </Box>
                </Box>
                <Stack direction={'row'} sx={{ flexWrap: "wrap", mt: 5, gap: 3.5, border: '5px solid #314B5A', padding: 3 }}>
                    {
                        seatData?.getAllSeats?.map((seat) => {
                            return (
                                <SeatGrid
                                    key={seat.id}
                                    status={seat.status}
                                    seatNumber={seat.seatNumber}
                                    selectedSeat={seat.id}
                                />
                            )
                        })
                    }
                </Stack>
                <BookingPopupModal
                    open={confirmOpen}
                    title="Confirm Auto Booking"
                    message="Are you sure you want to auto-booking?"
                    onConfirm={handleConfirmBooking}
                    onCancel={() => setConfirmOpen(false)}
                />
            </Box>
        </>
    );
}
export default BookSeat;  