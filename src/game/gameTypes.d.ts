export type Tile = number;

export interface Position {
  x: number;
  y: number;
}

export type GameStatus =
  | 'IDLE'      // 1. 게임 시작 전 (보드 숨김, 시작 버튼 보임)
  | 'PLAYING'   // 2. 게임 진행 중 (보드 보임, 타이머 실행)
  | 'PAUSED'    // 3. 일시 정지 상태 (옵션/ESC 키)
  | 'GAME_OVER' // 4. 게임 오버 (시간/힌트 종료, 보드 숨김, 결과창 보임)
  | 'LEVEL_UP';  // 5. 레벨 클리어 (잠깐 보드 숨김, 축하 메시지)