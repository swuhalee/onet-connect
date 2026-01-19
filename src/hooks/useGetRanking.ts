import { useQuery } from "@tanstack/react-query";
import { getRanking } from "../services/rankingService";
import { QueryDocumentSnapshot } from "firebase/firestore";

export const useGetRanking = (pageSize: number, direction: 'next' | 'prev' | 'first', cursor: QueryDocumentSnapshot | null) => {
    return useQuery({
        queryKey: ["getRanking", pageSize, direction, cursor?.id],
        queryFn: () => getRanking({ pageSize, direction, cursor }),
        placeholderData: (prev) => prev,
    });
};
