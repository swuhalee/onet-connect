/**
 * 시간 보너스 규칙 관리
 * 
 * TB-1: 5 콤보 달성 시 +5초
 * TB-2: 10 콤보 달성 시 +10초 (TB-1과 중복 지급)
 * TB-3: 특정 테마 타일 모두 제거 시 +15초 (레벨당 1회)
 * TB-4: 레벨 시작 후 10초 이내에 5쌍 이상 제거 시 +10초
 * TB-5: 남은 타일 수가 5쌍 미만일 때, 연속 제거 성공 시 +8초 (레벨당 1회)
 */

export interface TimeBonusState {
  // 콤보 관련
  combo: number
  lastRemoveTime: number
  comboTimeoutRef: ReturnType<typeof setTimeout> | null
  
  // TB-3: 특정 테마 타일 추적
  themeTileIds: Set<number> // 레벨별 특정 테마 타일 ID들
  themeTilesRemoved: Set<number> // 제거된 테마 타일 ID들
  tb3Awarded: boolean // TB-3 보너스 지급 여부
  
  // TB-4: 빠른 스타트
  gameStartTime: number
  pairsRemovedIn10Sec: number
  tb4Awarded: boolean
  
  // TB-5: 막판 스퍼트
  tb5Awarded: boolean
}

const COMBO_TIMEOUT = 3000 // 3초 내에 다음 제거가 없으면 콤보 리셋
const TB4_TIME_LIMIT = 10 // 10초
const TB5_PAIR_THRESHOLD = 5 // 5쌍 미만

/**
 * 레벨별 특정 테마 타일 ID 반환
 * 현재는 간단하게 레벨에 따라 다른 타일 ID 범위를 반환
 */
export function getThemeTileIdsForLevel(level: number, board: number[][]): Set<number> {
  // 레벨에 따라 특정 타일 ID 범위를 반환
  // 예: 레벨 1은 타일 1-5, 레벨 2는 타일 6-10 등
  const allTileIds = new Set<number>()
  board.forEach(row => {
    row.forEach(tile => {
      if (tile > 0) {
        allTileIds.add(tile)
      }
    })
  })
  
  // 레벨에 따라 특정 범위의 타일을 테마로 지정
  // 간단한 구현: 레벨에 따라 타일 ID를 그룹화
  const tileArray = Array.from(allTileIds).sort()
  const groupSize = Math.ceil(tileArray.length / 5) // 5개 그룹으로 나눔
  const groupIndex = (level - 1) % 5
  const startIndex = groupIndex * groupSize
  const endIndex = Math.min(startIndex + groupSize, tileArray.length)
  
  return new Set(tileArray.slice(startIndex, endIndex))
}

/**
 * 보드에서 남은 타일 쌍 수 계산
 */
export function countRemainingPairs(board: number[][]): number {
  const tileCounts = new Map<number, number>()
  
  board.forEach(row => {
    row.forEach(tile => {
      if (tile > 0) {
        tileCounts.set(tile, (tileCounts.get(tile) || 0) + 1)
      }
    })
  })
  
  let pairs = 0
  tileCounts.forEach(count => {
    pairs += Math.floor(count / 2)
  })
  
  return pairs
}

/**
 * 시간 보너스 상태 초기화
 */
export function initializeTimeBonusState(level: number, board: number[][]): TimeBonusState {
  return {
    combo: 0,
    lastRemoveTime: Date.now(),
    comboTimeoutRef: null,
    themeTileIds: getThemeTileIdsForLevel(level, board),
    themeTilesRemoved: new Set(),
    tb3Awarded: false,
    gameStartTime: Date.now(),
    pairsRemovedIn10Sec: 0,
    tb4Awarded: false,
    tb5Awarded: false,
  }
}

/**
 * 타일 제거 시 시간 보너스 체크 및 적용
 */
export function checkTimeBonuses(
  state: TimeBonusState,
  removedTileIds: number[],
  currentTime: number,
  board: number[][],
  level: number,
  onTimeBonus: (amount: number, reason: string) => void
): TimeBonusState {
  const newState = { ...state }
  const elapsedTime = (currentTime - newState.gameStartTime) / 1000 // 초 단위
  const remainingPairs = countRemainingPairs(board)
  
  // 콤보 업데이트
  const timeSinceLastRemove = currentTime - newState.lastRemoveTime
  if (timeSinceLastRemove > COMBO_TIMEOUT) {
    newState.combo = 1
  } else {
    newState.combo += 1
  }
  newState.lastRemoveTime = currentTime
  
  // 콤보 타임아웃 리셋
  if (newState.comboTimeoutRef) {
    clearTimeout(newState.comboTimeoutRef)
  }
  newState.comboTimeoutRef = setTimeout(() => {
    // 콤보 리셋은 다음 체크 시 처리됨
  }, COMBO_TIMEOUT)
  
  // TB-1: 5 콤보 달성 시 +5초
  if (newState.combo === 5) {
    onTimeBonus(5, '5 콤보 달성!')
  }
  
  // TB-2: 10 콤보 달성 시 +10초
  if (newState.combo === 10) {
    onTimeBonus(10, '10 콤보 달성!')
  }
  
  // TB-3: 특정 테마 타일 모두 제거 시 +15초 (레벨당 1회)
  if (!newState.tb3Awarded) {
    removedTileIds.forEach(tileId => {
      if (newState.themeTileIds.has(tileId)) {
        newState.themeTilesRemoved.add(tileId)
      }
    })
    
    // 모든 테마 타일이 제거되었는지 확인
    let allThemeTilesRemoved = true
    newState.themeTileIds.forEach(tileId => {
      if (!newState.themeTilesRemoved.has(tileId)) {
        allThemeTilesRemoved = false
      }
    })
    
    if (allThemeTilesRemoved) {
      newState.tb3Awarded = true
      onTimeBonus(15, '테마 타일 모두 제거!')
    }
  }
  
  // TB-4: 레벨 시작 후 10초 이내에 5쌍 이상 제거 시 +10초
  if (!newState.tb4Awarded && elapsedTime <= TB4_TIME_LIMIT) {
    newState.pairsRemovedIn10Sec += 1
    if (newState.pairsRemovedIn10Sec >= 5) {
      newState.tb4Awarded = true
      onTimeBonus(10, '빠른 스타트!')
    }
  }
  
  // TB-5: 남은 타일 수가 5쌍 미만일 때, 연속 제거 성공 시 +8초 (레벨당 1회)
  if (!newState.tb5Awarded && remainingPairs < TB5_PAIR_THRESHOLD && remainingPairs > 0) {
    newState.tb5Awarded = true
    onTimeBonus(8, '막판 스퍼트!')
  }
  
  return newState
}

/**
 * 콤보 타임아웃 정리
 */
export function cleanupTimeBonusState(state: TimeBonusState): void {
  if (state.comboTimeoutRef) {
    clearTimeout(state.comboTimeoutRef)
  }
}

