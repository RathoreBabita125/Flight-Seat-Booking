import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Button,
    InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client/react";
import { CHANGE_PASSWORD } from "../../query/user";
import type { ChangePasswordProps, PasswordData, PasswordError, ShowVisible } from "../../datatypes/datatypes";

const ChangePasswordModal = ({ open, onClose }: ChangePasswordProps) => {

    const [changePassword] = useMutation(CHANGE_PASSWORD);
    const [passwordData, setPasswordData] = useState<PasswordData>({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<PasswordError>({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [showVisible, setShowVisible] = useState<ShowVisible>({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false
    });

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPasswordData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleChangePassword = async () => {

        try {
            const response = await changePassword({
                variables: {
                    oldPassword: passwordData.oldPassword,
                    newPassword: passwordData.newPassword,
                    confirmPassword: passwordData.confirmPassword,
                },
            });

            toast.success("Password has been changed successfully.");
            console.log(response);
            onClose();

            setPasswordData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

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
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle
                    sx={{
                        color: "#314B5A",
                        fontWeight: 700,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    Change Password

                    <IconButton
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Old Password"
                        type={showVisible.oldPassword ? "text" : "password"}
                        name="oldPassword"
                        value={passwordData.oldPassword}
                        onChange={handlePasswordChange}
                        error={!!errors.oldPassword}
                        helperText={errors.oldPassword}
                        color="success"
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton aria-label="" onClick={() => setShowVisible((pre) => ({ ...pre, oldPassword: !pre.oldPassword }))}>
                                            {showVisible.oldPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="New Password"
                        type={showVisible.newPassword ? "text" : "password"}
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        error={!!errors.newPassword}
                        helperText={errors.newPassword}
                        color="success"
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton aria-label="" onClick={() => setShowVisible((pre) => ({ ...pre, newPassword: !pre.newPassword }))}>
                                            {showVisible.newPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Confirm New Password"
                        type={showVisible.confirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        color="success"
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton aria-label="" onClick={() => setShowVisible((pre) => ({ ...pre, confirmPassword: !pre.confirmPassword }))}>
                                            {showVisible.confirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                </DialogContent>

                <DialogActions sx={{ p: 3 }}>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        sx={{ color: '#314B5A' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleChangePassword}
                        sx={{
                            bgcolor: "#314B5A",
                            textTransform: "none",
                            "&:hover": {
                                bgcolor: "#314B5A",
                            },
                        }}
                    >
                        Update Password
                    </Button>

                </DialogActions>
            </Dialog>
        </>
    )
}
export default ChangePasswordModal;