import type { Tile, Position } from "../gameTypes"
import { ROWS, COLS } from "../gameConstants"
import { DIRECTIONS, isValidMove, type PathSearchState } from "./helper"

/**
 * 두 타일 간의 연결 경로를 찾습니다 (최대 2번까지 꺾을 수 있음).
 */
export function findTilePath(
  board: number[][],
  fromTile: Position,
  toTile: Position
): Position[] | null {
  if (fromTile.x === toTile.x && fromTile.y === toTile.y) return null

  // visited[row][col][direction][turns] - 각 방향과 턴 수에 따른 방문 상태
  // 외부 경로도 포함하기 위해 더 큰 범위로 설정
  const visited = Array.from({ length: ROWS + 2 }, () =>
    Array.from({ length: COLS + 2 }, () =>
      Array.from({ length: 4 }, () => Array(3).fill(false))
    )
  )

  const queue: PathSearchState[] = []

  // 시작 타일에서 모든 방향으로 시작
  for (let dir = 0; dir < 4; dir++) {
    visited[fromTile.x + 1][fromTile.y + 1][dir][0] = true
    queue.push({
      currentPosition: fromTile,
      pathSoFar: [fromTile],
      turnCount: 0,
      lastDirection: dir,
    })
  }

  while (queue.length > 0) {
    const { currentPosition, pathSoFar, turnCount, lastDirection } = queue.shift()!

    // 현재 방향으로 계속 이동
    for (let dir = 0; dir < 4; dir++) {
      const [dx, dy] = DIRECTIONS[dir]
      let nextX = currentPosition.x + dx
      let nextY = currentPosition.y + dy

      // 새로운 턴 수 계산
      const newTurnCount =
        lastDirection === null || lastDirection === dir ? turnCount : turnCount + 1

      if (newTurnCount > 2) continue // 최대 2번만 꺾을 수 있음

      const currentPath = [...pathSoFar]

      // 현재 방향으로 가능한 한 직진 (외부 경로 포함)
      while (isValidMove({ x: nextX, y: nextY }, board, toTile)) {
        const nextPosition = { x: nextX, y: nextY }
        currentPath.push(nextPosition)

        // 목표 타일에 도달
        if (nextX === toTile.x && nextY === toTile.y) {
          return currentPath
        }

        // 다른 방향으로 꺾을 수 있는지 확인
        for (let nextDir = 0; nextDir < 4; nextDir++) {
          const nextTurnCount = nextDir === dir ? newTurnCount : newTurnCount + 1
          if (nextTurnCount > 2) continue

          // 외부 경로도 포함하여 방문 상태 체크
          const visitX = nextX + 1
          const visitY = nextY + 1

          if (visitX >= 0 && visitX < ROWS + 2 && visitY >= 0 && visitY < COLS + 2) {
            if (!visited[visitX][visitY][nextDir][nextTurnCount]) {
              visited[visitX][visitY][nextDir][nextTurnCount] = true
              queue.push({
                currentPosition: nextPosition,
                pathSoFar: [...currentPath],
                turnCount: nextTurnCount,
                lastDirection: nextDir,
              })
            }
          }
        }

        nextX += dx
        nextY += dy
      }
    }
  }

  return null
}

/**
 * 두 타일이 연결 가능한지 확인합니다.
 */
export function connectionChecker(
  board: Tile[][],
  tile1: Position,
  tile2: Position
): boolean {
  // 같은 위치면 연결 불가
  if (tile1.x === tile2.x && tile1.y === tile2.y) return false

  // 타일 값이 다르면 연결 불가
  const value1 = board[tile1.x]?.[tile1.y] ?? 0
  const value2 = board[tile2.x]?.[tile2.y] ?? 0
  if (!value1 || !value2 || value1 !== value2) return false

  // 경로 찾기
  const path = findTilePath(board, tile1, tile2)
  return path !== null
}

