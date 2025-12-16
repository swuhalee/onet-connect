import { create } from 'zustand';
import type { GameStatus, Tile } from '../gameTypes';
import { createBoard } from '../utils/boardGenerator';

function boardGenerator(_level: number): Tile[][] {
  // 레벨에 따른 보드 생성 로직 (현재는 레벨 무시하고 기본 보드 생성)
  return createBoard();
}

export interface GameRecord {
  score: number;
  level: number;
  timestamp: number;
  isGameOver: boolean;
}

interface GameStore {
  status: GameStatus;
  board: Tile[][];
  score: number;
  hintsLeft: number;
  time: number;
  currentLevel: number;
  gameHistory: GameRecord[];

  setStatus: (newStatus: GameStatus) => void;
  startGame: (level: number) => void;
  pauseGame: () => void;
  endGame: (finalStatus: 'LEVEL_UP' | 'GAME_OVER') => void;
  updateScore: (amount: number) => void;
  decrementTime: () => void;
  useHint: () => void;
  saveGameRecord: (record: GameRecord) => void;
  clearGameHistory: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  status: 'IDLE',
  board: [],
  score: 0,
  hintsLeft: 3,
  time: 110,
  currentLevel: 1,
  gameHistory: [],

  setStatus: (newStatus: GameStatus) => {
    set({ status: newStatus });
  },

  startGame: (level: number) => {
    const newBoard = boardGenerator(level);
    const currentState = get();
    // 게임 시작 시에만 점수 리셋 (IDLE 상태에서 시작할 때)
    const shouldResetScore = currentState.status === 'IDLE' || currentState.status === 'GAME_OVER';
    set({
      status: 'PLAYING',
      board: newBoard,
      score: shouldResetScore ? 0 : currentState.score,
      hintsLeft: 3,
      time: 110,
      currentLevel: level,
    });
  },

  pauseGame: () => {
    set({ status: 'PAUSED' });
  },

  endGame: (finalStatus: 'LEVEL_UP' | 'GAME_OVER') => {
    const currentScore = get().score;
    const currentLevel = get().currentLevel;
    const isGameOver = finalStatus === 'GAME_OVER';
    
    // 게임 기록 저장 (전역 상태에 저장)
    const record: GameRecord = {
      score: currentScore,
      level: currentLevel,
      timestamp: Date.now(),
      isGameOver,
    };
    
    set((state) => ({
      status: finalStatus,
      gameHistory: [...state.gameHistory, record],
    }));
    
    // TODO: 게임 오버 상태이고 로그인된 상태일 때만 서버로 저장
    // if (isGameOver && isLoggedIn) {
    //   saveScoreToServer(record);
    // }
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
    }
  },

  saveGameRecord: (record: GameRecord) => {
    set((state) => ({
      gameHistory: [...state.gameHistory, record],
    }));
  },

  clearGameHistory: () => {
    set({ gameHistory: [] });
  },
}));

