import type { Position } from "./position";

/**
 * 경로 탐색 중의 상태를 나타냅니다.
 */
export interface PathSearchState {
    currentPosition: Position;
    pathSoFar: Position[];
    turnCount: number;
    lastDirection: number | null;
}