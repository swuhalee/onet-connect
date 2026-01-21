import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";
import { getUserProfile } from "../services/authService";
import { auth } from "../utils/firebase";

export const useGetUserProfile = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      setIsInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  return useQuery({
    queryKey: ["auth", "profile"],
    queryFn: getUserProfile,
    enabled: isInitialized,
  });
}
