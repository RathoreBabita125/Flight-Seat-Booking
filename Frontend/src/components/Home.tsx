import { Box, Typography, Stack} from "@mui/material";
import './Home.css';
import { Outlet } from "react-router-dom";

const Home = () => {
    return (
        <>
            <Box className="home-section">
                <Stack direction={'row'} spacing={5}>
                    <Outlet />
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