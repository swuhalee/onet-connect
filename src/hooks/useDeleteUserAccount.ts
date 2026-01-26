import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { deleteUserAccount } from "../services/authService";
import { enqueueSnackbar } from "notistack";
import i18n from "../i18n";

export const useDeleteUserAccount = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      await deleteUserAccount();
    },
    onSuccess: () => {
      queryClient.clear();

      enqueueSnackbar(t('messages.deleteAccountSuccess'), {
        variant: "success",
        anchorOrigin: { vertical: 'top', horizontal: 'center' }
      });

      navigate(`/${i18n.language}`);
    },
    onError: (error: any) => {
      const message = error?.code === 'auth/requires-recent-login'
        ? t('messages.deleteAccountRequiresRecentLogin')
        : t('messages.deleteAccountFailed');
      
      enqueueSnackbar(message, {
        variant: "error",
        anchorOrigin: { vertical: 'top', horizontal: 'center' }
      });
    },
  });
};
