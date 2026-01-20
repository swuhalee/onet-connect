import { useQuery } from "@tanstack/react-query";
import { getRanking } from "../services/rankingService";
import type { GetRankingParams } from "../models/ranking";

export const useGetRanking = ({pageSize, direction, cursor}: GetRankingParams) => {
    return useQuery({
        queryKey: ["getRanking", pageSize, direction, cursor?.id],
        queryFn: () => getRanking({ pageSize, direction, cursor }),
        placeholderData: (prev) => prev,
    });
};
