import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { loginWithGoogle } from "../services/authService";
import { useSyncUserProfile } from "./useSyncUserProfile";
import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

export const useLoginWithGoogle = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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

      enqueueSnackbar(t('messages.loginSuccess'), {
        variant: "success",
        anchorOrigin: { vertical: 'top', horizontal: 'center' }
      });

      navigate("/");
    },
    onError: (err: any) => {
      const message = err?.code === "auth/popup-closed-by-user"
        ? t('messages.loginPopupClosed')
        : t('messages.loginFailed');

      enqueueSnackbar(message, {
        variant: "error",
        anchorOrigin: { vertical: 'top', horizontal: 'center' }
      });
    },
  });
};
