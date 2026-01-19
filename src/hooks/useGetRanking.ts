import { useQuery } from "@tanstack/react-query";
import { getRanking } from "../services/rankingService";
import { QueryDocumentSnapshot } from "firebase/firestore";

export const useGetRanking = (pageSize: number, direction: any, cursor: QueryDocumentSnapshot | null) => {
    return useQuery({
        queryKey: ["getRanking", pageSize, direction, cursor?.id], // cursor id를 키에 넣어 변화 감지
        queryFn: () => getRanking({ pageSize, direction, cursor }),
        placeholderData: (previousData) => previousData, // 페이지 전환 시 깜빡임 방지
    });
};
