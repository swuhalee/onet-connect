import { styled } from "@mui/material/styles";
import { Table, TableBody, TableRow, TableCell, TableContainer, TableHead, Box, CircularProgress } from "@mui/material";
import type { RankingObject } from "../../../models/ranking";
import { getFlagEmoji } from "../../../utils/flags";

interface RankingTableProps {
    data: RankingObject[];
    isLoading: boolean;
    currentPage: number;
    pageSize: number;
}

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    border: "1px solid",
    borderColor: theme.palette.divider,
    minHeight: '500px', // 로딩 시 레이아웃 무너짐 방지
}));

const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold",
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
    borderRight: "1px solid",
    borderColor: theme.palette.divider,
    borderBottom: `2px solid ${theme.palette.divider}`,
}));

const StyledBodyCell = styled(TableCell)(({ theme }) => ({
    borderRight: "1px solid",
    borderColor: theme.palette.divider,
}));

const formatDate = (createdAt: any): string => {
    if (!createdAt) return "-";
    const date = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
    return date.toLocaleDateString("ko-KR");
};

const RankingTable = ({ data, isLoading, currentPage, pageSize }: RankingTableProps) => {
    return (
        <StyledTableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledHeaderCell width="10%">순위</StyledHeaderCell>
                        <StyledHeaderCell width="40%">플레이어</StyledHeaderCell>
                        <StyledHeaderCell width="25%">점수</StyledHeaderCell>
                        <StyledHeaderCell width="25%">날짜</StyledHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <StyledBodyCell colSpan={4} align="center" sx={{ height: 400 }}>
                                <CircularProgress size={24} sx={{ mr: 1 }} /> 로딩 중...
                            </StyledBodyCell>
                        </TableRow>
                    ) : data.length === 0 ? (
                        <TableRow>
                            <StyledBodyCell colSpan={4} align="center" sx={{ height: 400 }}>
                                데이터가 없습니다.
                            </StyledBodyCell>
                        </TableRow>
                    ) : (
                        data.map((row, index) => (
                            <TableRow key={row.id ?? `row-${index}`}>
                                <StyledBodyCell>
                                    {(currentPage - 1) * pageSize + index + 1}
                                </StyledBodyCell>
                                <StyledBodyCell>{row.displayName} {getFlagEmoji(row.country)}</StyledBodyCell>
                                <StyledBodyCell>{row.score.toLocaleString()}</StyledBodyCell>
                                <StyledBodyCell>{formatDate(row.createdAt)}</StyledBodyCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </StyledTableContainer>
    );
};

export default RankingTable;
