import { useQuery } from "@tanstack/react-query";
import { getMyRanking } from "../services/rankingService";
import { useGetUserProfile } from "./useGetUserProfile";

export const useGetMyRanking = () => {
    const { data: userProfile } = useGetUserProfile();

    return useQuery({
        queryKey: ["getMyRanking", userProfile?.uid],
        queryFn: () => {
            if (userProfile?.uid) {
                return getMyRanking(userProfile.uid);
            }
            throw new Error("User not found");
        },
        enabled: !!userProfile?.uid,
    });
};
