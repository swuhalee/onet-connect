import { useQuery } from "@tanstack/react-query";
import { getUserId } from "../services/authService";

export const useGetUserId = () => {
  return useQuery({
    queryKey: ["auth", "userId"],
    queryFn: getUserId,
  });
}
