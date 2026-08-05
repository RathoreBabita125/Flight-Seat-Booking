    import Box from "@mui/material/Box";
    import Button from "@mui/material/Button";
    import Stack from "@mui/material/Stack";
    import Typography from "@mui/material/Typography";
    import { useNavigate } from "react-router-dom";

    const UnAuthorized = () => {
        const navigate = useNavigate();
        return (
            <>
                <Box
                    sx={{
                        height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: "#314B5A",
                    }}
                >
                    <Stack  spacing={2} sx={{width:500, backgroundColor:'white', padding:10, borderRadius:4, alignItems:'center'}}>
                        <Typography variant="h2" sx={{fontWeight:600, color:'#314B5A'}}> 403</Typography>
                        <Typography variant="h4"sx={{ mt: 2 }}>Access Denied</Typography>
                        <Typography color="text.secondary" sx={{ mt: 2 }}>You don't have permission to access this page.</Typography>
                        <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent:'center'}}>
                            <Button
                                variant="contained"
                                onClick={() => navigate("/")}
                                sx={{backgroundColor:'#314B5A'}}
                            >
                                Go to Dashboard
                            </Button>

                            <Button
                                variant="outlined"
                                sx={{color:'#314B5A'}}
                                onClick={() => navigate('/login')}
                            >
                                Go Back
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </>
        )
    }
    export default UnAuthorized;