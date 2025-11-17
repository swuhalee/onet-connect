import { useEffect } from 'react';
import { create } from 'zustand';
import type { GameStatus, Tile } from './gameTypes';
import { EMPTY } from './constants';

/**
 * 게임 상태 인터페이스
 */
interface GameState {
  gameStatus: GameStatus;
  board: Tile[][];
  score: number;
  hintsLeft: number;
  time: number;
  selectedTile: { x: number; y: number } | null;
  path: { x: number; y: number }[] | null;
}

/**
 * 게임 액션 인터페이스
 */
interface GameActions {
  startGame: () => void;
  handleTileClick: (tileId: number) => void;
  useHint: () => void;
  endGame: (status: 'CLEARED' | 'GAMEOVER') => void;
  setSelectedTile: (tile: { x: number; y: number } | null) => void;
  setPath: (path: { x: number; y: number }[] | null) => void;
  setBoard: (board: Tile[][]) => void;
  setTime: (time: number) => void;
}

/**
 * 게임 스토어 타입
 */
type GameStore = GameState & GameActions;

/**
 * 더미 함수: 타일 연결 가능 여부 확인
 */
function connectionChecker(
  board: Tile[][],
  tile1: { x: number; y: number },
  tile2: { x: number; y: number }
): boolean {
  // 더미 구현: 항상 true 반환
  return true;
}

/**
 * 더미 함수: 보드 생성
 */
function boardGenerator(level: number): Tile[][] {
  // 더미 구현: 빈 보드 반환
  // 실제 구현에서는 level에 따라 보드를 생성해야 함
  const ROWS = 10;
  const COLS = 14;
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ id: EMPTY }))
  );
}

/**
 * 더미 함수: 점수 기록
 */
function recordScore(score: number): void {
  // 더미 구현: 콘솔에 출력
  console.log(`점수 기록: ${score}`);
}

/**
 * 게임 스토어 초기값
 */
const INITIAL_TIME = 60; // 초기 시간 (초)
const INITIAL_HINTS = 3; // 초기 힌트 횟수

/**
 * Zustand 게임 스토어
 */
const useGameStore = create<GameStore>((set, get) => ({
  // 초기 상태
  gameStatus: 'READY',
  board: boardGenerator(1),
  score: 0,
  hintsLeft: INITIAL_HINTS,
  time: INITIAL_TIME,
  selectedTile: null,
  path: null,

  // 게임 시작
  startGame: () => {
    set({
      gameStatus: 'PLAYING',
      board: boardGenerator(1),
      score: 0,
      hintsLeft: INITIAL_HINTS,
      time: INITIAL_TIME,
      selectedTile: null,
      path: null,
    });
  },

  // 타일 클릭 처리
  handleTileClick: (tileId: number) => {
    const state = get();
    if (state.gameStatus !== 'PLAYING') return;

    // 더미 구현: 타일 클릭 로직
    // 실제 구현에서는 선택된 타일과 클릭한 타일을 비교하여 연결 가능 여부 확인
    const { board, selectedTile } = state;

    if (!selectedTile) {
      // 첫 번째 타일 선택
      // tileId를 사용하여 보드에서 타일 위치 찾기
      // 실제 구현 필요
      set({ selectedTile: { x: 0, y: 0 } });
    } else {
      // 두 번째 타일 선택 및 연결 확인
      const tile2 = { x: 0, y: 0 }; // 실제로는 클릭한 타일의 위치
      const canConnect = connectionChecker(board, selectedTile, tile2);

      if (canConnect) {
        // 연결 성공: 점수 추가 및 타일 제거
        const newScore = state.score + 10; // 연결 성공 시 10점 추가
        const newBoard = board.map(row => [...row]);
        // 타일 제거 로직 (실제 구현 필요)
        set({
          score: newScore,
          board: newBoard,
          selectedTile: null,
          path: null,
        });
      } else {
        // 연결 실패: 선택 해제
        set({ selectedTile: null, path: null });
      }
    }
  },

  // 힌트 사용
  useHint: () => {
    const state = get();
    if (state.gameStatus !== 'PLAYING' || state.hintsLeft <= 0) return;

    const newHintsLeft = state.hintsLeft - 1;
    const newScore = Math.max(0, state.score - 50); // 힌트 사용 시 50점 감소

    set({
      hintsLeft: newHintsLeft,
      score: newScore,
    });
  },

  // 게임 종료
  endGame: (status: 'CLEARED' | 'GAMEOVER') => {
    const state = get();
    set({ gameStatus: status });
    recordScore(state.score);
  },

  // 선택된 타일 설정
  setSelectedTile: (tile: { x: number; y: number } | null) => {
    set({ selectedTile: tile });
  },

  // 경로 설정
  setPath: (path: { x: number; y: number }[] | null) => {
    set({ path });
  },

  // 보드 설정
  setBoard: (board: Tile[][]) => {
    set({ board });
  },

  // 시간 설정
  setTime: (time: number) => {
    set({ time });
  },
}));

/**
 * 게임 로직 커스텀 훅
 */
export function useGameLogic() {
  const gameStatus = useGameStore((state) => state.gameStatus);
  const store = useGameStore();

  // 타이머 효과
  useEffect(() => {
    if (gameStatus !== 'PLAYING') return;

    const interval = setInterval(() => {
      const currentTime = useGameStore.getState().time;
      if (currentTime <= 0) {
        clearInterval(interval);
        useGameStore.getState().endGame('GAMEOVER');
        return;
      }

      useGameStore.getState().setTime(currentTime - 1);
    }, 1000); // 1초마다 업데이트

    return () => clearInterval(interval);
  }, [gameStatus]); // gameStatus만 의존성으로 설정

  return store;
}

