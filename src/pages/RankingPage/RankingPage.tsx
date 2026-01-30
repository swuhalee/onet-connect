import { useState } from "react";
import { Typography, Box, Button, Divider } from "@mui/material";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import RankingTable from "./components/RankingTable";
import MainContainer from "../../layout/styles/MainContainer";
import { useGetRanking } from "../../hooks/useGetRanking";
import { useGetMyRanking } from "../../hooks/useGetMyRanking";
import { OG_IMAGE_URL } from "../../configs/appUrl";

const RankingPage = () => {
    const { t } = useTranslation();
    const [pageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [direction, setDirection] = useState<'next' | 'prev' | 'first'>('first');
    const [cursor, setCursor] = useState<QueryDocumentSnapshot | null>(null);
    // const [sortBy, setSortBy] = useState<string>("all");

    const { data, isLoading, isFetching } = useGetRanking({ pageSize, direction, cursor });
    const { data: myRanking } = useGetMyRanking();

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
        <>
            <title>{t('meta.ranking.title')}</title>
            <meta name="description" content={t('meta.ranking.description')} />
            <meta property="og:title" content={t('meta.ranking.title')} />
            <meta property="og:description" content={t('meta.ranking.description')} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={OG_IMAGE_URL} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={t('meta.ranking.title')} />
            <meta name="twitter:description" content={t('meta.ranking.description')} />
            <meta name="twitter:image" content={OG_IMAGE_URL} />

            <MainContainer>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {t('ranking.title')}
                </Typography>

            <Divider sx={{ marginTop: "8px", marginBottom: "24px" }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "8px" }}>
                <Typography variant="body1">
                    {t('ranking.myRank')}: {myRanking ? `${myRanking.rank} (${myRanking.score.toLocaleString()})` : t('common.n/a')}
                </Typography>
                {/* <FormControl size="small" sx={{ minWidth: 200 }}>
                    <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} displayEmpty sx={{ height: "32px" }}>
                        <MenuItem value="all">전체 순위</MenuItem>
                        <MenuItem value="2026-01">2026년 1월 순위</MenuItem>
                    </Select>
                </FormControl> */}
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
                    {t('common.previous')}
                </Button>
                <Typography fontWeight="bold">{page} {t('common.page')}</Typography>
                <Button
                    variant="outlined"
                    onClick={handleNextPage}
                    disabled={(data?.count || 0) < pageSize || isFetching}
                    sx={{ height: "32px" }}
                >
                    {t('common.next')}
                </Button>
            </Box>
            </MainContainer>
        </>
    );
};

export default RankingPage;
