import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box, TextField, Stack } from "@mui/material";
import type { BookMySeatProps } from "../../datatypes/datatypes";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useState } from "react";
import ConfirmSeatModal from "./ConfirmModal";

const BookMySeatModal = ({ open, onClose, seatNumber, selectedSeat }: BookMySeatProps) => {

    const {userAuth}=useSelector((state:RootState)=>state.userData);
    const [openConfirmModal, setOpenConfirmModal]=useState<boolean>(false);

    return (
        <>
            <Dialog
                open={open}
                onClose={(event, reason)=>{
                    if(reason==='backdropClick' || reason==='escapeKeyDown'){
                        return;
                    }
                    onClose();
                }}
                maxWidth='sm'
                fullWidth
            >
                <Box sx={{padding:1.5}}>
                    <DialogTitle sx={{ fontWeight: 600, fontSize: 20, color: '#314B5A' }}>Book Seat</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Stack direction={'column'} spacing={2} sx={{mt:3}}>
                                <TextField
                                    label="Passenger Name"
                                    name="fullName"
                                    value={userAuth?.fullName}  
                                    required   
                                    color="success"
                                />
                                <TextField
                                    label="Gender"
                                    name="gender"
                                    value={userAuth?.gender}
                                    required  
                                    color="success"
                                />
                                <TextField
                                    label="Seat Number"
                                    name="seatNumber"
                                    value={seatNumber}
                                    required
                                    color="success"  
                                />
                                <TextField
                                    label="Age"
                                    name="age"
                                    value={userAuth?.age}
                                    required
                                    color="success"  
                                />
                                <TextField
                                    label="Phone"
                                    name="phone"
                                    value={userAuth?.phone}
                                    required 
                                    color="success" 
                                />
                            </Stack>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} sx={{ color: '#314B5A' }} variant="outlined"> Close</Button>
                        <Button 
                            sx={{ 
                                backgroundColor: '#314B5A', 
                                color:'white' 
                            }} 
                            variant="outlined"
                            onClick={()=>setOpenConfirmModal(true)} 
                        > Book Now</Button>

                        <ConfirmSeatModal
                            open={openConfirmModal}
                            onClose={()=>setOpenConfirmModal(false)}
                            selectedSeat={selectedSeat}
                        />
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}
export default BookMySeatModal;