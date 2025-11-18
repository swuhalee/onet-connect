import { create } from 'zustand';
import type { GameStatus, Tile } from '../gameTypes';
import { createBoard } from '../utils/boardGenerator';
// 더미 함수들
function boardGenerator(_level: number): Tile[][] {
  // 레벨에 따른 보드 생성 로직 (현재는 레벨 무시하고 기본 보드 생성)
  return createBoard();
}

function recordScore(score: number): void {
  // 점수 기록 로직 (더미 구현)
  console.log('Recording score:', score);
  // TODO: 실제 점수 기록 로직 구현
}

// Zustand 스토어 인터페이스 정의
interface GameStore {
  // State
  status: GameStatus;
  board: Tile[][];
  score: number;
  hintsLeft: number;
  time: number;

  // Actions
  setStatus: (newStatus: GameStatus) => void;
  startGame: (level: number) => void;
  pauseGame: () => void;
  endGame: (finalStatus: 'LEVEL_UP' | 'GAME_OVER') => void;
  updateScore: (amount: number) => void;
  decrementTime: () => void;
  useHint: () => void;
}

// Zustand 스토어 생성
export const useGameStore = create<GameStore>((set, get) => ({
  // 초기 State
  status: 'IDLE',
  board: [],
  score: 0,
  hintsLeft: 3,
  time: 110,

  // Actions 구현
  setStatus: (newStatus: GameStatus) => {
    set({ status: newStatus });
  },

  startGame: (level: number) => {
    const newBoard = boardGenerator(level);
    set({
      status: 'PLAYING',
      board: newBoard,
      score: 0,
      hintsLeft: 3,
      time: 110,
    });
  },

  pauseGame: () => {
    set({ status: 'PAUSED' });
  },

  endGame: (finalStatus: 'LEVEL_UP' | 'GAME_OVER') => {
    const currentScore = get().score;
    set({ status: finalStatus });
    recordScore(currentScore);
  },

  updateScore: (amount: number) => {
    set((state) => ({
      score: state.score + amount,
    }));
  },

  decrementTime: () => {
    const currentTime = get().time;
    if (currentTime <= 1) {
      set({ time: 0 });
      get().endGame('GAME_OVER');
    } else {
      set({ time: currentTime - 1 });
    }
  },

  useHint: () => {
    const currentHints = get().hintsLeft;
    if (currentHints > 0) {
      set({
        hintsLeft: currentHints - 1,
      });
      // 힌트 사용 시 페널티 적용
      get().updateScore(-50);
    }
  },
}));

