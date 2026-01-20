
import { Button, styled } from "@mui/material";

export const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#3a3a5a' : '#e0e0e0',
    color: theme.palette.text.primary,
    padding: "4px 16px",
    minWidth: 0,
    width: "auto",
    gap: "8px",
    [theme.breakpoints.down('sm')]: {
        padding: "6px",
    },
    borderRadius: "0px",
    fontSize: "14px",
    fontWeight: 500,
    boxShadow: "none",
    "&:hover": {
        backgroundColor: theme.palette.mode === 'dark' ? '#4a4a6a' : '#d0d0d0',
    },
}));
