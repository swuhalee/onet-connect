import { updateUserProfile } from "../services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import type { UserProfile } from "../models/user";
import { enqueueSnackbar } from "notistack";

export const useUpdateUserProfile = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (userProfile: UserProfile) => {
            if (userProfile?.uid) {
                return await updateUserProfile(userProfile.uid, userProfile);
            }
            throw new Error("User not found");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
            enqueueSnackbar(t('messages.profileUpdateSuccess'), {
                variant: "success",
                anchorOrigin: { vertical: 'top', horizontal: 'center' }
            });
        },
        onError: () => {
            enqueueSnackbar(t('messages.profileUpdateFailed'), {
                variant: "error",
                anchorOrigin: { vertical: 'top', horizontal: 'center' }
            });
        },
    });
};
