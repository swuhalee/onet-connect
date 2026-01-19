import { getAdditionalUserInfo, signInWithPopup, signOut } from "firebase/auth";
import { auth, db, googleProvider } from "../utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { UserProfile } from "../models/user";

export const loginWithGoogle = async (): Promise<{ isNewUser: boolean }> => {
  const credential = await signInWithPopup(auth, googleProvider);
  const info = getAdditionalUserInfo(credential);

  return {
    isNewUser: info?.isNewUser ?? false,
  };
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};

export const getUserId = async (): Promise<string | undefined> => {
  return auth.currentUser?.uid;
};

export const getUserProfile = async (): Promise<UserProfile | null> => {
  const uid = await getUserId();
  if (uid) {
    const userRef = doc(db, "users", uid);
    const user = await getDoc(userRef);
    return user.data() as UserProfile;
  }
  return null;
};

export const syncUserProfile = async () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not found");
  }

  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    displayName: user.displayName,
    country: navigator.language.split('-')[1] || 'KR',
  }, { merge: true });
};

export const updateUserProfile = async (uid: string, user: UserProfile) => {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, user, { merge: true });
};
