import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Table, TableBody, TableRow, TableCell, TableContainer, TableHead, TablePagination } from "@mui/material";
import type { RankingData } from "../../../models/ranking";

interface RankingTableProps {
    data: RankingData[];
}

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    border: "1px solid",
    borderColor: theme.palette.divider,
}));

const StyledTable = styled(Table)({
    borderCollapse: "collapse",
});

const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(0, 0, 0, 0.02)',
}));

const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold",
    borderRight: "1px solid",
    borderColor: theme.palette.divider,
    borderBottom: `2px solid ${theme.palette.divider}`,
    padding: "8px 16px",
    "&:last-of-type": {
        borderRight: "none",
    },
}));

const StyledBodyCell = styled(TableCell)(({ theme }) => ({
    borderRight: "1px solid",
    borderColor: theme.palette.divider,
    padding: "8px 16px",
    "&:last-of-type": {
        borderRight: "none",
    },
}));

const StyledTablePagination = styled(TablePagination)({
    border: "none",
});

const RankingTable = ({ data }: RankingTableProps) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
            <StyledTableContainer>
                <StyledTable>
                    <StyledTableHead>
                        <TableRow>
                            <StyledHeaderCell>순위</StyledHeaderCell>
                            <StyledHeaderCell>플레이어</StyledHeaderCell>
                            <StyledHeaderCell>점수</StyledHeaderCell>
                            <StyledHeaderCell>날짜</StyledHeaderCell>
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        {paginatedData.map((row) => (
                            <TableRow key={row.id}>
                                <StyledBodyCell>{row.rank}</StyledBodyCell>
                                <StyledBodyCell>{row.player}</StyledBodyCell>
                                <StyledBodyCell>{row.score.toLocaleString()}</StyledBodyCell>
                                <StyledBodyCell>{row.date}</StyledBodyCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <StyledTablePagination
                                count={data.length}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                rowsPerPageOptions={[10, 25, 50]}
                                labelRowsPerPage="페이지당 행 수:"
                                labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count !== -1 ? count : `${to}개 이상`}`}
                                colSpan={4}
                            />
                        </TableRow>
                    </TableBody>
                </StyledTable>
            </StyledTableContainer>
        </>
    );
};

export default RankingTable;
