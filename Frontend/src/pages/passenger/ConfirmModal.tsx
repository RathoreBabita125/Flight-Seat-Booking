import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box, Typography } from '@mui/material';
import type { ConfirmSeatProps } from '../../datatypes/datatypes';
import { useMutation } from '@apollo/client/react';
import { BOOK_SEAT } from '../../query/booking';
import { toast } from 'react-toastify';
import { GET_ALL_SEATS } from '../../query/seat';

const ConfirmSeatModal = ({ open, onClose, selectedSeat }: ConfirmSeatProps) => {

    const [bookingSeat] = useMutation(BOOK_SEAT,
        {
            refetchQueries: [{ query: GET_ALL_SEATS}],
        }
    );

    console.log("confirm seat", selectedSeat)

    const handleConfirm = async () => {
        try {
            const response = await bookingSeat({
                variables: {
                    seat: selectedSeat,  
                }
            });

            if (response) {
                toast.success("Seat have been booked successfully.");
            }

        } catch (error) {
            toast.error((error as Error).message);
        }
        onClose();
    }

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
                maxWidth='sm'
                fullWidth
            >
                <Box sx={{ padding: 2 }}>
                    <DialogTitle sx={{ fontWeight: 600, color: '#314B5A' }}>Confirm Seat</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Typography variant='body1' sx={{ color: '#314B5A' }}> You want to book this seat. Are you sure? </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} sx={{ color: '#314B5A' }} variant='outlined'>Cancel</Button>
                        <Button onClick={handleConfirm} sx={{ color: 'white', backgroundColor: '#314B5A' }}>Confirm</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}
export default ConfirmSeatModal;