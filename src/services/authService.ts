import { deleteUser, getAdditionalUserInfo, signInWithPopup, signOut } from "firebase/auth";
import { auth, db, googleProvider } from "../utils/firebase";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import type { UserProfile } from "../models/user";
import { withAuthErrorLogging, withFirestoreErrorLogging } from "../utils/firebaseErrorLogger";

export const loginWithGoogle = async (): Promise<{ isNewUser: boolean }> => {
  return withAuthErrorLogging('loginWithGoogle', async () => {
    const credential = await signInWithPopup(auth, googleProvider);
    const info = getAdditionalUserInfo(credential);

    return {
      isNewUser: info?.isNewUser ?? false,
    };
  });
};

export const logout = async (): Promise<void> => {
  return withAuthErrorLogging('logout', async () => {
    await signOut(auth);
  });
};

export const getUserProfile = async (): Promise<UserProfile | null> => {
  return withFirestoreErrorLogging('getUserProfile', async () => {
    const uid = auth.currentUser?.uid ?? null;
    if (uid) {
      const userRef = doc(db, "users", uid);
      const user = await getDoc(userRef);
      if (user.exists()) {
        return {
          displayName: '',
          email: '',
          country: '',
          ...user.data(),
          uid,
        } as UserProfile;
      }
    }
    return null;
  });
};

export const syncUserProfile = async () => {
  return withFirestoreErrorLogging('syncUserProfile', async () => {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not found");
    }

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      displayName: user.displayName,
      email: user.email,
      country: navigator.language.split('-')[1]?.toUpperCase() || '',
    }, { merge: true });
  });
};

export const updateUserProfile = async (uid: string, user: UserProfile) => {
  return withFirestoreErrorLogging('updateUserProfile', async () => {
    const userRef = doc(db, "users", uid);
    const { uid: _, ...userData } = user; // uid를 제외한 나머지 데이터만 저장함
    await setDoc(userRef, userData, { merge: true });
  });
};

export const deleteUserAccount = async (): Promise<void> => {
  return withAuthErrorLogging('deleteUserAccount', async () => {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not found");
    }

    const uid = user.uid;
    await deleteUser(user);
    const userRef = doc(db, "users", uid);
    await deleteDoc(userRef);
  });
};
