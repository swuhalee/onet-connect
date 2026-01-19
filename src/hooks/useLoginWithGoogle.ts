import { useMutation } from "@tanstack/react-query";
import { loginWithGoogle } from "../services/authService";
import { useSyncUserProfile } from "./useSyncUserProfile";
import { useQueryClient } from "@tanstack/react-query";

export const useLoginWithGoogle = () => {
  const queryClient = useQueryClient();
  const { mutate: syncUserProfile } = useSyncUserProfile();

  return useMutation({
    // data: { isNewUser: boolean }
    mutationFn: loginWithGoogle,
    onSuccess: (data) => {
      // 첫 로그인인 경우에만 프로필 동기화
      if (data?.isNewUser) {
        syncUserProfile();
      } else {
        queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
      }
    },
    onError: (err: unknown) => {
      const authError = err as { code?: string };
      if (authError?.code === "auth/popup-closed-by-user") {
        throw new Error("로그인 창이 닫혔습니다.");
      }
      throw new Error("로그인에 실패했습니다.");
    },
  });
};
