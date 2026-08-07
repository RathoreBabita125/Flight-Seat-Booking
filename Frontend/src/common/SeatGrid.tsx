import {
    Card,
    CardContent,
    Typography,
    Box,
} from "@mui/material";
import type { SeatProps } from "../datatypes/datatypes";
import { useState } from 'react';
import ViewBookingDetails from "../pages/admin/ViewBookingDetails";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import BookMySeatModal from "../pages/passenger/BookMySeatModal";

const SeatGrid = ({ seatNumber, status, selectedSeat, bookedSeatData}: SeatProps) => {

    const [openBookingDetails, setOpenBookingDetails] = useState<boolean>(false);
    const {userAuth}=useSelector((state:RootState)=>state.userData);

    return (
        <>
            <Card
                sx={{
                    width: 100,
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: "0.3s",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 6,
                    },
                    direction: 'flex',
                    justifyItems: 'center',
                    alignItems: 'center',
                    backgroundColor: status === "Available" ? "#426F7F" : "#8B0000",
                    color: status === "Available" ? "white" : "white",
                    cursor: 'pointer'
                }}
                onClick={() => {
                    setOpenBookingDetails(true);
                }}
            >
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Box
                            sx={{
                                width: 60,
                                height: 60,
                                borderRadius: "50%",
                                bgcolor: "#E3F2FD",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: status === "Available" ? "#314B5A" : "#8B0000"
                               
                            }}
                        >
                            {seatNumber}
                        </Box>
                        <Box>
                            <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                sx={{ fontSize: 15, fontWeight: 600, mt: 1 }}
                            >
                                {status}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
            {
                userAuth?.role==="Admin" && <ViewBookingDetails
                    open={openBookingDetails}
                    onClose={() => setOpenBookingDetails(false)}
                    status={status}
                    seatNumber={seatNumber}
                    bookedSeatData={bookedSeatData || []}
                />
            }
             {
                userAuth?.role==="Passenger" && <BookMySeatModal
                    open={openBookingDetails}
                    onClose={() => setOpenBookingDetails(false)}
                    seatNumber={seatNumber}
                    selectedSeat={selectedSeat}
                />
            }
            
        </>
    )
}
export default SeatGrid;