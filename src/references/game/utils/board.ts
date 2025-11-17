import { COLS, EMPTY, GRID_SIZE, ROWS, TILE_COUNTS } from "../constants";
import type { Position } from "../types";

// 패딩 값 (캔버스 경계에서의 여백)
const PADDING = GRID_SIZE;

/**
 * 게임 보드를 생성합니다.
 * @returns 초기화된 게임 보드
 */
export function createBoard(): number[][] {
    const board = Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => EMPTY)
    );
    
    // 타일 배치 로직
    const tilePositions: number[] = [];
    
    // 6개씩 배치할 타일들 (20개) - 총 120개
    TILE_COUNTS.SIX_COUNT.forEach(tileIndex => {
        for (let i = 0; i < 6; i++) {
            tilePositions.push(tileIndex);
        }
    });
    
    // 10개씩 배치할 타일들 (2개) - 총 20개
    TILE_COUNTS.TEN_COUNT.forEach(tileIndex => {
        for (let i = 0; i < 10; i++) {
            tilePositions.push(tileIndex);
        }
    });
    
    if (tilePositions.length !== ROWS * COLS) {
        console.error(`Tile count mismatch: expected ${ROWS * COLS}, got ${tilePositions.length}`);
    }
    
    // 타일들을 랜덤하게 섞기
    for (let i = tilePositions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tilePositions[i], tilePositions[j]] = [tilePositions[j], tilePositions[i]];
    }
    
    // 보드에 타일 배치
    let tileIndex = 0;
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (tileIndex < tilePositions.length) {
                board[row][col] = tilePositions[tileIndex] + 1; // 1부터 시작하는 인덱스
                tileIndex++;
            }
        }
    }
    
    return board;
}

/**
 * 클릭한 위치에서 타일 위치를 찾습니다.
 * @param clientX 클라이언트 X 좌표
 * @param clientY 클라이언트 Y 좌표
 * @param rect 캔버스의 getBoundingClientRect() 결과
 * @returns 타일 위치 또는 null
 */
export function getTilePosition(
    clientX: number, 
    clientY: number, 
    rect: DOMRect | null
): Position | null {
    if (!rect) return null;

    const x = clientX - rect.left - PADDING;
    const y = clientY - rect.top - PADDING;

    const col = Math.floor(x / GRID_SIZE);
    const row = Math.floor(y / GRID_SIZE);

    if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
        return { x: row, y: col };
    }
    return null;
} 