import type { Tile } from "../gameTypes"
import { ROWS, COLS } from "../gameConstants"

export function createBoard(): Tile[][] {
  // 1~20: 각각 6개씩 (120개), 21~22: 각각 10개씩 (20개) = 총 140개
  const tileValues: number[] = []
  
  for (let value = 1; value <= 20; value++) {
    for (let i = 0; i < 6; i++) tileValues.push(value)
  }
  for (let value = 21; value <= 22; value++) {
    for (let i = 0; i < 10; i++) tileValues.push(value)
  }

  // 랜덤 섞기
  for (let i = tileValues.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[tileValues[i], tileValues[j]] = [tileValues[j], tileValues[i]]
  }

  // 보드 생성
  let valueIndex = 0
  
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => tileValues[valueIndex++] || 0)
  )
} 