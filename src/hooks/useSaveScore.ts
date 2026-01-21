import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveScore } from "../services/gameService";
import { useGetUserProfile } from "./useGetUserProfile";

export const useSaveScore = () => {
  const queryClient = useQueryClient();
  const { data: userProfile } = useGetUserProfile();

  return useMutation({
    mutationFn: async (score: number) => {
      if (userProfile?.uid && userProfile) {
        return await saveScore(userProfile.uid, userProfile, score);
      }
      throw new Error("로그인 후 점수를 저장할 수 있습니다.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getMyRanking", userProfile?.uid] });
      queryClient.invalidateQueries({ queryKey: ["getRanking"] });
    },
  });
};
