import { COLS, EMPTY, GRID_SIZE, ROWS, TILE_COUNTS } from "../CONST";
import type { Point } from "../types/point";

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
    
    // 총 140개 타일이 있어야 함 (10x14)
    console.log(`Total tiles: ${tilePositions.length}`);
    
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
 * 격자 중앙점 좌표를 구합니다.
 * @param row 행 인덱스
 * @param col 열 인덱스
 * @returns 중앙점 좌표
 */
export function getGridCenter(row: number, col: number): Point {
    return {
        x: col * GRID_SIZE + GRID_SIZE / 2,
        y: row * GRID_SIZE + GRID_SIZE / 2,
    };
}

/**
 * 타일 중앙점 좌표를 구합니다 (격자 중앙점과 동일).
 * @param row 행 인덱스
 * @param col 열 인덱스
 * @returns 타일 중앙점 좌표
 */
export function getTileCenter(row: number, col: number): Point {
    return getGridCenter(row, col);
}

/**
 * 클릭한 위치가 어떤 격자 셀인지 찾습니다.
 * @param clientX 클라이언트 X 좌표
 * @param clientY 클라이언트 Y 좌표
 * @param rect 캔버스의 getBoundingClientRect() 결과
 * @returns 격자 위치 또는 null
 */
export function getGridPosition(
    clientX: number, 
    clientY: number, 
    rect: DOMRect | null
): Point | null {
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