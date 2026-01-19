import type { FieldValue } from "firebase/firestore";

export interface RankingObject {
    id?: string;
    uid: string;
    displayName: string;
    country: string;
    score: number;
    createdAt: FieldValue;
}

export interface GetRankingParams {
    pageSize: number;
    pageParam: any | null;
}
