import { Box, Typography, Stack, TextField, Button } from "@mui/material";
import './Home.css';

const Home = () => {
    return (
        <>
            <Box className="home-section">
                <Stack direction={'row'} spacing={5}>
                    <Box className="login-section">
                        <Box className="login-form">
                            <Typography variant="h5" sx={{ color: '#314B5A', fontWeight: 600 }}>Login Form</Typography>
                            <Stack direction={'column'} spacing={2.5} sx={{ mt: 3.5 }}>
                                <TextField
                                    label="Email"
                                    required
                                    color="success"
                                />
                                <TextField
                                    label="Password"
                                    required
                                     color="success"
                                />
                                <Stack direction={'row'} sx={{ justifyContent: 'space-between', marginTop: 2, textAlign: 'center' }}>
                                    <Typography sx={{ cursor: 'pointer', color: '#314B5A' }}>Forgot password?</Typography>
                                </Stack>
                                <Button variant="contained" sx={{ padding: 1.5, backgroundColor: '#314B5A' }}>Login</Button>
                                <Stack direction={'row'} spacing={1}>
                                    <Typography variant="body1" sx={{ color: 'gray' }}>Don't have an Account? </Typography>
                                    <Typography sx={{ color: '#314B5A', cursor: 'pointer' }}><strong>Sign up</strong></Typography>
                                </Stack>
                            </Stack>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h1" sx={{ fontWeight: 'bold', color: '#426F7F' }}>Fly high.</Typography>
                        <Typography variant="h1" sx={{ fontWeight: 'bold', color: '#314B5A' }}>above the sky.</Typography>
                    </Box>
                </Stack>
            </Box>
        </>
    )
}
export default Home;