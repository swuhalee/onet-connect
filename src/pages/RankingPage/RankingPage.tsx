import { useState } from "react";
import { Typography, Box, Select, MenuItem, FormControl } from "@mui/material";
import type { RankingData } from "../../models/ranking";
import RankingTable from "./components/RankingTable/RankingTable";

const generateMockData = (): RankingData[] => {
    const players = ["JZE", "boru", "jabajop", "Archeaic", "Mannerless guy", "Gadget", "Md-101", "Mario Pro Gamer", "Bensie", "ralokt"];
    const data: RankingData[] = [];
    
    for (let i = 0; i < 100; i++) {
        data.push({
            id: i + 1,
            rank: i + 1,
            player: players[i % players.length] + (i >= players.length ? ` #${Math.floor(i / players.length) + 1}` : ""),
            score: Math.floor(Math.random() * 10000) + 1000,
            date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
        });
    }
    
    return data;
};

const RankingPage = () => {
    const [data] = useState<RankingData[]>(generateMockData());
    const [sortBy, setSortBy] = useState<string>("all");

    const handleSortChange = (event: { target: { value: string } }) => {
        setSortBy(event.target.value);
    };

    return (
        <Box sx={{padding: '28px'}}>
            <Typography variant="h4" sx={{ marginBottom: 1.5, fontWeight: "bold" }}>
                랭킹
            </Typography>

            <Box 
                sx={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "flex-end",
                    marginBottom: 1
                }}
            >
                <Typography variant="body1">
                    내 순위: n/a
                </Typography>
                
                <FormControl size="small" sx={{ minWidth: 200 }}>
                    <Select
                        value={sortBy}
                        onChange={handleSortChange}
                        displayEmpty
                    >
                        <MenuItem value="all">전체 순위</MenuItem>
                        <MenuItem value="2026-01">2026년 1월 순위</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            
            <RankingTable data={data} />
        </Box>
    );
};

export default RankingPage;
