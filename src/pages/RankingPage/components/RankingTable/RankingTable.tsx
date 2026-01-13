import { useState } from "react";
import { TableBody, TableRow } from "@mui/material";
import type { RankingData } from "../../../models/ranking";
import {
    StyledTableContainer,
    StyledTable,
    StyledTableHead,
    StyledHeaderCell,
    StyledBodyCell,
    StyledTablePagination,
} from "./RankingTable.style";

interface RankingTableProps {
    data: RankingData[];
}

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
                    </TableBody>
                </StyledTable>
            </StyledTableContainer>

            <StyledTablePagination
                count={data.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[10, 25, 50]}
                labelRowsPerPage="페이지당 행 수:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count !== -1 ? count : `${to}개 이상`}`}
            />
        </>
    );
};

export default RankingTable;
