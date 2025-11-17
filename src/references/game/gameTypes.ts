/**
 * 게임 상태를 나타내는 타입
 */
export type GameStatus = 'READY' | 'PLAYING' | 'PAUSED' | 'CLEARED' | 'GAMEOVER';

/**
 * 게임 보드의 타일을 나타내는 인터페이스
 */
export interface Tile {
  id: number; // 타일 ID (0은 빈 타일을 나타냄)
}

