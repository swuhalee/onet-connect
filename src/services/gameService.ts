import { db } from "../utils/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import type { RankingObject } from "../models/ranking";
import type { UserProfile } from "../models/user";
import { withFirestoreErrorLogging } from "../utils/firebaseErrorLogger";

export const saveScore = async (uid: string, userProfile: UserProfile, score: number) => {
    return withFirestoreErrorLogging('saveScore', async () => {
        const data: RankingObject = {
            uid,
            displayName: userProfile.displayName,
            country: userProfile.country,
            score,
            createdAt: serverTimestamp(),
        };

        await addDoc(collection(db, "scores"), data);
    });
};
