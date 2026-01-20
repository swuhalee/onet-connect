import { useQuery } from "@tanstack/react-query";
import { getMyRanking } from "../services/rankingService";
import { useGetUserId } from "./useGetUserId";

export const useGetMyRanking = () => {
    const { data: uid } = useGetUserId();

    return useQuery({
        queryKey: ["getMyRanking", uid],
        queryFn: () => {
            if (uid) {
                return getMyRanking(uid);
            }
            throw new Error("User not found");
        },
        enabled: !!uid,
    });
};
