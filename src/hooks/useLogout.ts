import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { logout } from "../services/authService";
import { enqueueSnackbar } from "notistack";

export const useLogout = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "userId"]});
      queryClient.invalidateQueries({ queryKey: ["auth", "profile"]});

      enqueueSnackbar(t('messages.logoutSuccess'), {
        variant: "success",
        anchorOrigin: { vertical: 'top', horizontal: 'center' }
      });
    },
    onError: () => {
      enqueueSnackbar(t('messages.logoutFailed'), {
        variant: "error",
        anchorOrigin: { vertical: 'top', horizontal: 'center' }
      });
    },
  });
};
