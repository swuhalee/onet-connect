import { collection, getDocs, limit, orderBy, query, startAfter, endBefore, limitToLast, where, getCountFromServer } from "firebase/firestore";
import { db } from "../utils/firebase";
import type { GetRankingParams, RankingObject, MyRanking } from "../models/ranking";

export const getRanking = async ({ pageSize, direction, cursor }: GetRankingParams) => {
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

export const getMyRanking = async (uid: string): Promise<MyRanking | null> => {
    const myRecordsSnapshot = await getDocs(
        query(collection(db, "scores"), where("uid", "==", uid), orderBy("score", "desc"), limit(1))
    );
    
    if (myRecordsSnapshot.empty) return null;
    const bestRecord = myRecordsSnapshot.docs[0].data() as RankingObject;

    const higherScoresQuery = query(
        collection(db, "scores"),
        where("score", ">", bestRecord.score)
    );
    
    const snapshot = await getCountFromServer(higherScoresQuery);
    const rank = snapshot.data().count + 1;

    return { rank, score: bestRecord.score };
};
