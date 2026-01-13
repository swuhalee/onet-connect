import { Box } from "@mui/material"
import OnetWebView from "./components/OnetWebView"

const HomePage = () => {
    return (
        <Box sx={{padding: '28px', display: 'flex', justifyContent: 'center'}}>
            <OnetWebView />
        </Box>
    )
}

export default HomePage