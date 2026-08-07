import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import type { ConfirmDialogProps } from "../datatypes/datatypes";

const BookingPopupModal = ({
    open,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = "Yes, Confirm",
    cancelText = "No, Go Back",
}: ConfirmDialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={(_, reason)=>{
                if(reason==='backdropClick' || reason==='escapeKeyDown'){
                    return;
                }
                onCancel();
            }}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle sx={{ fontWeight: 600, color: "#314B5A" }}>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
                <Button onClick={onCancel} variant="outlined" sx={{ color: "#314B5A", borderColor: "#314B5A" }}>
                    {cancelText}
                </Button>
                <Button onClick={onConfirm} variant="contained" sx={{ backgroundColor: "#314B5A" }}>
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BookingPopupModal;