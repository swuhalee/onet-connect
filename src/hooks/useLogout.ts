import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../services/authService";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
    },
    onError: () => {
      throw new Error("로그아웃에 실패했습니다.");
    },
  });
};
