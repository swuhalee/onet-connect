import type { Position } from "../gameTypes"
import { findTilePath } from "./connectionChecker"

export interface MatchPair {
  from: Position
  to: Position
}

export interface PlayableBoardState {
  board: number[][]
  match: MatchPair | null
  wasShuffled: boolean
}

export interface ShuffleResult {
  board: number[][]
  match: MatchPair | null
}

const MAX_SHUFFLE_ATTEMPTS = 50

const hasRemainingTiles = (board: number[][]): boolean =>
  board.some((row) => row.some((value) => value > 0))

export const shuffleBoardValues = (board: number[][]): number[][] => {
  if (!board.length) return []

  const remainingValues: number[] = []
  board.forEach((row) => {
    row.forEach((value) => {
      if (value > 0) {
        remainingValues.push(value)
      }
    })
  })

  for (let i = remainingValues.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[remainingValues[i], remainingValues[j]] = [remainingValues[j], remainingValues[i]]
  }

  let valueIndex = 0
  return board.map((row) =>
    row.map((value) => {
      if (value === 0) return 0
      return remainingValues[valueIndex++] ?? 0
    })
  )
}

export const findFirstMatchOnBoard = (board: number[][]): MatchPair | null => {
  const positionsByValue = new Map<number, Position[]>()

  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < (board[x]?.length ?? 0); y++) {
      const value = board[x][y]
      if (value > 0) {
        const positions = positionsByValue.get(value) ?? []
        positions.push({ x, y })
        positionsByValue.set(value, positions)
      }
    }
  }

  for (const positions of positionsByValue.values()) {
    for (let i = 0; i < positions.length - 1; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const from = positions[i]
        const to = positions[j]
        const path = findTilePath(board, from, to)
        if (path) {
          return { from: { ...from }, to: { ...to } }
        }
      }
    }
  }

  return null
}

export const ensurePlayableBoardState = (
  board: number[][],
  attempts: number = MAX_SHUFFLE_ATTEMPTS
): PlayableBoardState => {
  if (!hasRemainingTiles(board)) {
    return { board, match: null, wasShuffled: false }
  }

  let match = findFirstMatchOnBoard(board)
  if (match) {
    return { board, match, wasShuffled: false }
  }

  let shuffledBoard = board
  let remainingAttempts = attempts
  let wasShuffled = false

  while (remainingAttempts > 0) {
    shuffledBoard = shuffleBoardValues(shuffledBoard)
    wasShuffled = true
    match = findFirstMatchOnBoard(shuffledBoard)
    if (match) {
      return { board: shuffledBoard, match, wasShuffled: true }
    }
    remainingAttempts -= 1
  }

  return { board: shuffledBoard, match: null, wasShuffled }
}

export const forceShuffleBoard = (board: number[][]): ShuffleResult => {
  const shuffledBoard = shuffleBoardValues(board)
  return {
    board: shuffledBoard,
    match: findFirstMatchOnBoard(shuffledBoard),
  }
}
