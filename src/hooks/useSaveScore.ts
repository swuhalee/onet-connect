import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveScore } from "../services/gameService";
import { useGetUserProfile } from "./useGetUserProfile";
import { useGetUserId } from "./useGetUserId";

export const useSaveScore = () => {
  const queryClient = useQueryClient();
  const { data: uid } = useGetUserId();
  const { data: userProfile } = useGetUserProfile();

  return useMutation({
    mutationFn: async (score: number) => {
      if (uid && userProfile) {
        return await saveScore(uid, userProfile, score);
      }
      throw new Error("로그인 후 점수를 저장할 수 있습니다.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getRanking"] });
    },
  });
};
