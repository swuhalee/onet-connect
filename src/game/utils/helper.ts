import type { Position } from "../gameTypes"
import { ROWS, COLS } from "../gameConstants"

export const DIRECTIONS = [
  [-1, 0], // 상
  [1, 0],  // 하
  [0, -1], // 좌
  [0, 1],  // 우
]

export interface PathSearchState {
  currentPosition: Position
  pathSoFar: Position[]
  turnCount: number
  lastDirection: number | null
}

/**
 * 위치가 보드 범위 내에 있는지 확인합니다.
 */
export function isWithinBounds(position: Position): boolean {
  return position.x >= 0 && position.x < ROWS && position.y >= 0 && position.y < COLS
}

/**
 * 해당 위치로 이동 가능한지 확인합니다 (외부 경로 포함).
 */
export function isValidMove(
  position: Position,
  board: number[][],
  targetTile: Position
): boolean {
  // 목표 타일이면 이동 가능
  if (position.x === targetTile.x && position.y === targetTile.y) return true

  // 보드 내부이고 빈 공간이면 이동 가능
  if (isWithinBounds(position)) {
    return board[position.x][position.y] === 0
  }

  // 외부 경로(-1까지)도 허용
  return position.x >= -1 && position.x <= ROWS && position.y >= -1 && position.y <= COLS
}

