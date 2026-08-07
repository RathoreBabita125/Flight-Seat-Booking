import { Box, Button, Stack, TextField, Typography, MenuItem, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import type { FormError, UserFormData } from "../../datatypes/datatypes";
import { handleInput } from "../../validators/handleInputs";
import { validateInput } from "../../validators/validateInputs";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client/react";
import { SIGNUP } from "../../query/user";
import { handleOnBlurInput } from "../../validators/handleOnBlur";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import LoadingCompo from "../../common/Loading";

const Signup = () => {

    const [showVisible, setShowVisible] = useState({
        password: false,
        confirmPassword: false
    });
    const [register] = useMutation(SIGNUP);
    const navigate = useNavigate();

    const [formData, setFormData] = useState<UserFormData>({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        gender: "",
        age: ""
    });

    const [error, setError] = useState<FormError>({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        gender: "",
        age: ""
    });

    const { userAuth, loading } = useSelector((state: RootState) => state.userData);

    if (loading) return <LoadingCompo />

    if (userAuth?.role) {
        return <Navigate to="/dashboard" replace />;
    }


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleInput(event, formData, setFormData, error, setError);
    }

    const handleOnBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        handleOnBlurInput(event, formData, error, setError);
    }

    const handleSignup = async () => {
        console.log(formData)
        try {
            const inputFields: (keyof UserFormData)[] = ['fullName', 'email', 'password', 'confirmPassword', 'phone', 'age', 'gender'];
            const isValid = validateInput(formData, setError, inputFields);

            if (!isValid) {
                toast.error("Enter valid details");
            }

            const response = await register({
                variables: {
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    phone: formData.phone,
                    age: Number(formData.age),
                    gender: formData.gender
                }
            });

            console.log(response);
            toast.success("You have signed up successfully");
            setFormData({
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone: "",
                gender: "",
                age: ""
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
    }

    return (
        <Box className="signup-form">

            <Stack direction={'column'}>
                <Typography variant="h5" sx={{ color: '#314B5A', fontWeight: 600 }}> Sign Up</Typography>
                <Stack direction={'column'} spacing={2} sx={{ mt: 3, width: '25vw' }}>
                    <TextField
                        label="Full Name"
                        required
                        color="success"
                        size="small"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={handleOnBlur}
                        error={!!error.fullName}
                        helperText={error.fullName ? error.fullName : ''}
                    />
                    <TextField
                        label="Email"
                        required
                        color="success"
                        type="email"
                        size="small"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleOnBlur}
                        error={!!error.email}
                        helperText={error.email ? error.email : ''}
                    />
                    <Stack direction={'row'} spacing={2}>
                        <TextField
                            label="Phone"
                            required
                            color="success"
                            type="tel"
                            size="small"
                            fullWidth
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onBlur={handleOnBlur}
                            error={!!error.phone}
                            helperText={error.phone ? error.phone : ''}
                        />
                        <TextField
                            label="Age"
                            required
                            color="success"
                            type="number"
                            size="small"
                            name="age"
                            sx={{ maxWidth: 100 }}
                            value={formData.age}
                            onChange={handleChange}
                            onBlur={handleOnBlur}
                            error={!!error.age}
                            helperText={error.age ? error.age : ''}
                        />
                    </Stack>
                    <TextField
                        select
                        label="Gender"
                        required
                        color="success"
                        size="small"
                        defaultValue=""
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        onBlur={handleOnBlur}
                        error={!!error.gender}
                        helperText={error.gender ? error.gender : ''}
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                    <TextField
                        label="Password"
                        required
                        color="success"
                        type={showVisible.password ? 'text' : 'password'}
                        size="small"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleOnBlur}
                        error={!!error.password}
                        helperText={error.password ? error.password : ''}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton aria-label="" onClick={() => setShowVisible((pre) => ({ ...pre, password: !pre.password }))}>
                                            {showVisible.password ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                    <TextField
                        label="Confirm Password"
                        required
                        color="success"
                        type={showVisible.confirmPassword ? 'text' : 'password'}
                        size="small"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleOnBlur}
                        error={!!error.confirmPassword}
                        helperText={error.confirmPassword ? error.confirmPassword : ''}
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
                        sx={{ padding: 1.2, backgroundColor: '#314B5A' }}
                        onClick={handleSignup}
                    >
                        Sign Up
                    </Button>

                    <Stack direction={'row'} spacing={1}>

                        <Typography variant="body2" sx={{ color: 'gray' }}>
                            Already have an Account?
                        </Typography>

                        <Link to='/login'>
                            <Typography
                                variant="body2"
                                sx={{ color: '#314B5A', cursor: 'pointer' }}
                            >
                                <strong>Login</strong>
                            </Typography>
                        </Link>

                    </Stack>

                </Stack>
            </Stack>

        </Box>
    );
};
export default Signup;