import { useMutation } from "@tanstack/react-query";
import { syncUserProfile } from "../services/authService";
import { useQueryClient } from "@tanstack/react-query";

export const useSyncUserProfile = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async () => {
            return await syncUserProfile();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
        },
    });
};
