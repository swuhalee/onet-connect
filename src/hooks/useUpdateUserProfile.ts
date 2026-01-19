import { updateUserProfile } from "../services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetUserId } from "./useGetUserId";
import type { UserProfile } from "../models/user";

export const useUpdateUserProfile = () => {
    const queryClient = useQueryClient();
    const { data: uid } = useGetUserId();
    
    return useMutation({
        mutationFn: async (userProfile: UserProfile) => {
            if (uid) {
                return await updateUserProfile(uid, userProfile);
            }
            throw new Error("User not found");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
        },
    });
};
