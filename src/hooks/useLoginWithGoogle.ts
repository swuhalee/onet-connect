import { useMutation } from "@tanstack/react-query";
import { loginWithGoogle } from "../services/authService";
import { useSyncUserProfile } from "./useSyncUserProfile";
import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

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
        queryClient.invalidateQueries({ queryKey: ["auth", "userId"] });
        queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
      }

      enqueueSnackbar("로그인에 성공했습니다.", {
        variant: "success",
        anchorOrigin: { vertical: 'top', horizontal: 'center' }
      });
    },
    onError: (err: any) => {
      const message = err?.code === "auth/popup-closed-by-user"
        ? "로그인 창이 닫혔습니다."
        : "로그인에 실패했습니다.";

      enqueueSnackbar(message, {
        variant: "error",
        anchorOrigin: { vertical: 'top', horizontal: 'center' }
      });
    },
  });
};
