import { styled } from "@mui/material/styles";
import { Table, TableBody, TableRow, TableCell, TableContainer, TableHead, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { RankingObject } from "../../../models/ranking";
import { getFlagEmoji } from "../../../utils/flags";
import { getLocaleFromLanguage } from "../../../utils/languageDetection";

interface RankingTableProps {
    data: RankingObject[];
    isLoading: boolean;
    currentPage: number;
    pageSize: number;
}

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    border: "1px solid",
    borderColor: theme.palette.divider,
    minHeight: '300px', // 로딩 시 레이아웃 무너짐 방지
}));

const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
    fontSize: "12px",
    fontWeight: "bold",
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
    borderRight: "1px solid",
    borderColor: theme.palette.divider,
    borderBottom: `2px solid ${theme.palette.divider}`,
    padding: '8px 16px',
    [theme.breakpoints.up('md')]: {
        fontSize: "14px",
    },
}));

const StyledBodyCell = styled(TableCell)(({ theme }) => ({
    fontSize: "12px",
    borderRight: "1px solid",
    borderColor: theme.palette.divider,
    padding: '8px 16px',
    [theme.breakpoints.up('md')]: {
        fontSize: "14px",
    },
}));

const RankingTable = ({ data, isLoading, currentPage, pageSize }: RankingTableProps) => {
    const { t, i18n } = useTranslation();
    
    const formatDate = (createdAt: any): string => {
        if (!createdAt) return "-";
        const date = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
        const locale = getLocaleFromLanguage(i18n.language);
        return date.toLocaleDateString(locale);
    };

    return (
        <StyledTableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledHeaderCell width="15%">{t('ranking.rank')}</StyledHeaderCell>
                        <StyledHeaderCell width="30%">{t('ranking.player')}</StyledHeaderCell>
                        <StyledHeaderCell width="25%">{t('ranking.score')}</StyledHeaderCell>
                        <StyledHeaderCell width="30%">{t('ranking.date')}</StyledHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <StyledBodyCell colSpan={4} align="center" sx={{ height: 400 }}>
                                <CircularProgress size={24} />
                            </StyledBodyCell>
                        </TableRow>
                    ) : data.length === 0 ? (
                        <TableRow>
                            <StyledBodyCell colSpan={4} align="center" sx={{ height: 400 }}>
                                {t('common.noData')}
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
