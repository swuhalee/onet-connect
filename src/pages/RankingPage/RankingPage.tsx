import { useState } from "react";
import { Typography, Box, Select, MenuItem, FormControl, Button, Divider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { QueryDocumentSnapshot } from "firebase/firestore";
import RankingTable from "./components/RankingTable";
import { getRanking } from "../../services/rankingService";
import { MainContainer } from "../../common/styles/MainContainer";

const RankingPage = () => {
    const [pageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [direction, setDirection] = useState<'next' | 'prev' | 'first'>('first');
    const [cursor, setCursor] = useState<QueryDocumentSnapshot | null>(null);
    const [sortBy, setSortBy] = useState<string>("all");

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["getRanking", pageSize, direction, cursor?.id],
        queryFn: () => getRanking({ pageSize, direction, cursor }),
        placeholderData: (prev) => prev,
    });

    const handleNextPage = () => {
        if (data?.lastDoc) {
            setDirection('next');
            setCursor(data.lastDoc);
            setPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (data?.firstDoc) {
            setDirection('prev');
            setCursor(data.firstDoc);
            setPage(prev => prev - 1);
        }
    };

    return (
        <MainContainer>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                랭킹
            </Typography>

            <Divider sx={{ marginTop: "8px", marginBottom: "24px" }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "8px" }}>
                <Typography variant="body1">내 순위: n/a</Typography>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                    <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} displayEmpty sx={{ height: "32px" }}>
                        <MenuItem value="all">전체 순위</MenuItem>
                        <MenuItem value="2026-01">2026년 1월 순위</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <RankingTable 
                data={data?.data || []} 
                isLoading={isLoading || isFetching} 
                currentPage={page}
                pageSize={pageSize}
            />

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 3, marginTop: "12px" }}>
                <Button 
                    variant="outlined" 
                    onClick={handlePrevPage} 
                    disabled={page === 1 || isFetching}
                    sx={{ height: "32px" }}
                >
                    이전
                </Button>
                <Typography fontWeight="bold">{page} 페이지</Typography>
                <Button 
                    variant="outlined" 
                    onClick={handleNextPage} 
                    disabled={(data?.count || 0) < pageSize || isFetching}
                    sx={{ height: "32px" }}
                >
                    다음
                </Button>
            </Box>
        </MainContainer>
    );
};

export default RankingPage;
