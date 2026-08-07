import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import type { FormError } from "../../datatypes/datatypes";
import { toast } from "react-toastify";
import { handleInput } from "../../validators/handleInputs";
import { handleOnBlurInput } from "../../validators/handleOnBlur";
import { validateInput } from "../../validators/validateInputs";
import { useMutation } from "@apollo/client/react";
import { FORGET_PASSWORD } from "../../query/user";
import type { UserFormData } from "../../datatypes/datatypes";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import LoadingCompo from "../../common/Loading";

const ForgotPassword = () => {

    const [forgetPassword] = useMutation(FORGET_PASSWORD);
    const navigate = useNavigate();
    const [showVisible, setShowVisible] = useState({
        newPassword: false,
        confirmPassword: false,
    });

    const [formData, setFormData] = useState<UserFormData>({
        email: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [error, setError] = useState<FormError>({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { userAuth, loading } = useSelector((state: RootState) => state.userData);

    if (loading) return <LoadingCompo />

    if (userAuth?.role) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleInput(event, formData, setFormData, error, setError);
    };

    const handleOnBlur = (
        event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        handleOnBlurInput(event, formData, setError);
    };

    const handleResetPassword = async () => {

        try {

            if (formData.newPassword !== formData.confirmPassword) {
                toast.error("Password does not match.");
            }
            const inputFields: (keyof UserFormData)[] = ["email", "newPassword"];
            const isValid = validateInput(formData, setError, inputFields);

            if (!isValid) {
                toast.error("Enter valid details");
                return;
            }
            await forgetPassword({
                variables: {
                    email: formData.email,
                    newPassword: formData.newPassword,
                    confirmPassword: formData.confirmPassword
                }
            });

            toast.success("Password has been reset successfully.");
            setFormData({
                email: "",
                newPassword: "",
                confirmPassword: "",
            });
            navigate('/login');

        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Something went wrong");
            }
        }
    };

    return (
        <Box className="forget-form">
            <Stack direction={'column'} sx={{ width: '25vw' }}>

                <Typography variant="h5" sx={{ color: '#314B5A', fontWeight: 600 }}>Forgot Password</Typography>

                <Typography variant="body2" sx={{ color: 'gray', mt: 1 }}>
                    Enter your registered email and set a new password.
                </Typography>

                <Stack direction="column" spacing={2} sx={{ mt: 3 }}>
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleOnBlur}
                        required
                        color="success"
                        type="email"
                        size="small"
                        error={!!error.email}
                        helperText={error.email || ""}
                    />
                    <TextField
                        label="New Password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        onBlur={handleOnBlur}
                        required
                        color="success"
                        type={showVisible.newPassword ? 'text' : 'password'}
                        size="small"
                        error={!!error.password}
                        helperText={error.password || ""}
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
                        label="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleOnBlur}
                        required
                        color="success"
                        type={showVisible.confirmPassword ? 'text' : 'password'}
                        size="small"
                        error={!!error.confirmPassword}
                        helperText={error.confirmPassword || ""}
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
                    <Button
                        variant="contained"
                        sx={{
                            padding: 1.2,
                            backgroundColor: '#314B5A'
                        }}
                        onClick={handleResetPassword}
                    >
                        Reset Password
                    </Button>
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ justifyContent: 'center' }}
                    >
                        <Link to="/login">
                            <Typography sx={{ color: '#314B5A', cursor: 'pointer' }}>
                                <strong>Back to Login</strong>
                            </Typography>
                        </Link>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
};
export default ForgotPassword;