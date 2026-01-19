import { collection, getDocs, limit, orderBy, query, QueryDocumentSnapshot, startAfter, endBefore, limitToLast } from "firebase/firestore";
import { db } from "../utils/firebase";
import type { RankingObject } from "../models/ranking";

interface GetRankingParams {
    pageSize: number;
    direction: 'next' | 'prev' | 'first';
    cursor: QueryDocumentSnapshot | null;
}

export const getRanking = async ({pageSize, direction, cursor}: GetRankingParams) => {
    let q = query(
        collection(db, "scores"),
        orderBy("score", "desc"),
        orderBy("__name__", "desc")
    );

    if (direction === 'next' && cursor) {
        q = query(q, startAfter(cursor), limit(pageSize));
    } else if (direction === 'prev' && cursor) {
        // 이전 페이지는 뒤에서부터 limit을 걸어야 함
        q = query(q, endBefore(cursor), limitToLast(pageSize));
    } else {
        // 첫 페이지
        q = query(q, limit(pageSize));
    }

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as RankingObject),
    }));

    return {
        data,
        firstDoc: snapshot.docs[0] || null,
        lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
        count: snapshot.size
    };
};
