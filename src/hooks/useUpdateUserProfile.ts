import { updateUserProfile } from "../services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetUserId } from "./useGetUserId";
import type { UserProfile } from "../models/user";
import { enqueueSnackbar } from "notistack";

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
            enqueueSnackbar("프로필 업데이트에 성공했습니다.", {
                variant: "success",
                anchorOrigin: { vertical: 'top', horizontal: 'center' }
            });
        },
        onError: () => {
            enqueueSnackbar("프로필 업데이트에 실패했습니다.", {
                variant: "error",
                anchorOrigin: { vertical: 'top', horizontal: 'center' }
            });
        },
    });
};
