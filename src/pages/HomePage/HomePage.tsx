import { Box } from "@mui/material"
import OnetWebView from "./components/OnetWebView"

const HomePage = () => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <OnetWebView />
        </Box>
    )
}

export default HomePage