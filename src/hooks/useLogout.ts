import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { logout } from "../services/authService";
import { enqueueSnackbar } from "notistack";
import i18n from "../i18n";

export const useLogout = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "profile"]});

      enqueueSnackbar(t('messages.logoutSuccess'), {
        variant: "success",
        anchorOrigin: { vertical: 'top', horizontal: 'center' }
      });

      navigate(`/${i18n.language}`);
    },
    onError: () => {
      enqueueSnackbar(t('messages.logoutFailed'), {
        variant: "error",
        anchorOrigin: { vertical: 'top', horizontal: 'center' }
      });
    },
  });
};
