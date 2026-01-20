import type { FieldValue, QueryDocumentSnapshot } from "firebase/firestore";

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
    direction: 'next' | 'prev' | 'first';
    cursor: QueryDocumentSnapshot | null;
}

export interface MyRanking {
    rank: number;
    score: number;
}
