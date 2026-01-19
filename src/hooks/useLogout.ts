import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../services/authService";
import { enqueueSnackbar } from "notistack";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "userId"]});
      queryClient.invalidateQueries({ queryKey: ["auth", "profile"]});

      enqueueSnackbar("로그아웃에 성공했습니다.", {
        variant: "success",
        anchorOrigin: { vertical: 'top', horizontal: 'center' }
      });
    },
    onError: () => {
      enqueueSnackbar("로그아웃에 실패했습니다.", {
        variant: "error",
        anchorOrigin: { vertical: 'top', horizontal: 'center' }
      });
    },
  });
};
