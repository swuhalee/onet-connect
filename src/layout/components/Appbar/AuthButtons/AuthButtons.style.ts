import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";

export const AuthButtonsContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "12px",
});

export const SignUpButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: "#ffffff",
    padding: "8px 20px",
    fontSize: "14px",
    fontWeight: 600,
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
    },
}));

export const LoginButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#3a3a5a' : '#e0e0e0',
    color: theme.palette.text.primary,
    padding: "8px 20px",
    fontSize: "14px",
    fontWeight: 600,
    "&:hover": {
        backgroundColor: theme.palette.mode === 'dark' ? '#4a4a6a' : '#d0d0d0',
    },
}));
