import type { FieldValue } from "firebase/firestore";

export interface SaveScoreParams {
    uid: string;
    score: number;
    createdAt: FieldValue;
}
