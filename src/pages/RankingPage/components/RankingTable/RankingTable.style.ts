import { styled } from "@mui/material/styles";
import { Table, TableCell, TableContainer, TableHead, TablePagination } from "@mui/material";

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    border: "1px solid",
    borderColor: theme.palette.divider,
}));

export const StyledTable = styled(Table)({
    borderCollapse: "collapse",
});

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' 
        ? 'rgba(255, 255, 255, 0.05)' 
        : 'rgba(0, 0, 0, 0.02)',
}));

export const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold",
    borderRight: "1px solid",
    borderColor: theme.palette.divider,
    borderBottom: `2px solid ${theme.palette.divider}`,
    padding: "8px 16px",
    "&:last-of-type": {
        borderRight: "none",
    },
}));

export const StyledBodyCell = styled(TableCell)(({ theme }) => ({
    borderRight: "1px solid",
    borderColor: theme.palette.divider,
    padding: "8px 16px",
    "&:last-of-type": {
        borderRight: "none",
    },
}));

export const StyledTablePagination = styled(TablePagination)({
    border: "none",
});
