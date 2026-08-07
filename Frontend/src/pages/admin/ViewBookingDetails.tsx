import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from "@mui/material";
import type { ViewBookingDetailsProps } from "../../datatypes/datatypes";

const ViewBookingDetails = ({ open, onClose, status, seatNumber, bookedSeatData }: ViewBookingDetailsProps) => {
    return (
        <>
            <Dialog
                open={open}
                onClose={(event, reason) => {
                    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
                        return;
                    }
                    onClose();
                }}
                fullWidth
                maxWidth="xs"
            >
                <Box sx={{padding:1}}>
                    <DialogTitle sx={{ color: '#314B5A', fontWeight: 600 }}>View Booking Details</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {status === "Available" && `Currently, No booking details here for ${seatNumber} seat.`}
                            {status === "Booked" &&
                                <>
                                    <Stack>
                                        <Typography sx={{fontSize:16}}><strong>Seat Number:</strong> {seatNumber}</Typography>
                                        <Typography sx={{fontSize:16}}><strong>Seat Status: </strong>{status}</Typography>
                                        <Typography sx={{fontSize:16}}><strong>Passenger Name: </strong>{bookedSeatData[0]?.user?.fullName}</Typography>
                                        <Typography sx={{fontSize:16}}><strong>Gender: </strong>{bookedSeatData[0]?.user?.gender}</Typography>
                                        <Typography sx={{fontSize:16}}><strong>Age: </strong>{bookedSeatData[0]?.user?.age}</Typography>
                                        <Typography sx={{fontSize:16}}><strong>Phone: </strong>{bookedSeatData[0]?.user?.phone}</Typography>
                                        <Typography sx={{fontSize:16}}><strong>Booking Status: </strong>{bookedSeatData[0]?.status}</Typography>
                                    </Stack>
                                </>
                            }
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={onClose}
                            variant="outlined"
                            sx={{ color: '#314B5A' }}
                        >Cancel</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}
export default ViewBookingDetails;