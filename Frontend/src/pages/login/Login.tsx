import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { LOGIN } from "../../query/user";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import type { FormError, UserFormData } from "../../datatypes/datatypes";
import { validateInput } from "../../validators/validateInputs";
import { toast } from "react-toastify";
import { handleInput } from "../../validators/handleInputs";
import { handleOnBlurInput } from "../../validators/handleOnBlur";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {

    const [showVisible, setShowVisible] = useState(false);
    const [login] = useMutation(LOGIN);

    const [formData, setFormData] = useState<UserFormData>({
        email: "",
        password: "",
    });

    const [error, setError] = useState<FormError>({
        email: "",
        password: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleInput(event, formData, setFormData, error, setError);
    }

    const handleOnBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        handleOnBlurInput(event, formData, error, setError);
    }

    const handleLogin = async () => {
        try {
            const inputFields: (keyof UserFormData)[] = ['email', 'password'];
            const isValid = validateInput(formData, setError, inputFields);

            if (!isValid) {
                toast.error("Enter valid details");
            }

            const response = await login({
                variables: {
                    email: formData.email,
                    password: formData.password
                }
            });

            console.log(response);
            toast.success("You have been logged in successfully.");
            setFormData({
                email: "",
                password: "",
            });

        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Something went wrong");
            }
        }
    }

    return (
        <>
            <Box className="login-section">
                <Box className="login-form">
                    <Typography variant="h5" sx={{ color: '#314B5A', fontWeight: 600 }}>Login Form</Typography>

                    <Stack direction={'column'} spacing={2.5} sx={{ mt: 3.5 }}>
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            color="success"
                            size="small"
                            onBlur={handleOnBlur}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            type={showVisible ? 'text' : 'password'}
                            color="success"
                            size="small"
                            onBlur={handleOnBlur}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton aria-label="" onClick={() => setShowVisible(!showVisible)}>
                                                {showVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />

                        <Stack direction={'row'} sx={{ justifyContent: 'space-between', marginTop: 2, textAlign: 'center' }}>
                            <Link to='/forget-password'><Typography sx={{ cursor: 'pointer', color: '#314B5A' }}>Forgot password?</Typography></Link>
                        </Stack>

                        <Button
                            variant="contained"
                            sx={{
                                padding: 1.5,
                                backgroundColor: '#314B5A'
                            }}
                            onClick={handleLogin}
                        >Login</Button>

                        <Stack direction={'row'} spacing={1}>
                            <Typography variant="body1" sx={{ color: 'gray' }}>Don't have an Account? </Typography>
                            <Link to='/signup'><Typography sx={{ color: '#314B5A', cursor: 'pointer' }}><strong>Sign up</strong></Typography></Link>
                        </Stack>

                    </Stack>
                </Box>
            </Box>
        </>
    )
}
export default Login;