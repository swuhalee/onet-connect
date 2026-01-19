import { Outlet } from "react-router"
import AppBar from "./components/Appbar"
import { Box, Container, styled } from "@mui/material";

const OutletWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
    backgroundColor: theme.palette.background.default,
}));

const OutletContainer = styled(Container)(({ theme }) => ({
    maxWidth: theme.breakpoints.values.lg,
    padding: "28px",
}));

const AppLayout = () => {
    return (
        <>
            <AppBar />
            <OutletWrapper>
                <OutletContainer>
                    <Outlet />
                </OutletContainer>
            </OutletWrapper>
        </>
    )
}

export default AppLayout