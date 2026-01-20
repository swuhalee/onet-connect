import { Box } from "@mui/material"
import OnetWebView from "./components/OnetWebView"

const HomePage = () => {
    return (
        <Box 
            sx={{
                display: 'flex', 
                flexDirection: 'column',
                alignItems: { xs: 'flex-start', sm: 'center' },
                width: '100%',
                overflowX: 'auto',
                padding: { xs: '20px', sm: 0 },
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
            }}
        >
            <OnetWebView />
        </Box>
    )
}

export default HomePage