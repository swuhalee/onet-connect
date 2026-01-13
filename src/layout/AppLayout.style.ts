import { Box, Container, styled } from "@mui/material";

export const OutletWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
    backgroundColor: theme.palette.background.default,
}));

export const OutletContainer = styled(Container)({
    maxWidth: "lg",
});