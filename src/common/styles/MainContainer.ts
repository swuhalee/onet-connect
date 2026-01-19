import { Container, styled } from "@mui/material";

export const MainContainer = styled(Container)(({ theme }) => ({
    width: "100%",
    maxWidth: theme.breakpoints.values.lg,
    padding: "28px",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid",
    borderColor: theme.palette.divider,
}));
