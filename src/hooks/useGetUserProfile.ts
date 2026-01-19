import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/authService";

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["auth", "profile"],
    queryFn: getUserProfile,
  });
}
