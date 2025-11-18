import { useState, useEffect, useCallback, useRef } from "react"
import type { Position } from "../gameTypes"
import GameArea from "../components/GameArea"
import GameHUD from "../components/GameHUD"
import { createBoard } from "../utils/boardGenerator"
import { findTilePath } from "../utils/connectionChecker"
import {
  ensurePlayableBoardState,
  findFirstMatchOnBoard,
  type MatchPair,
} from "../utils/hintManager"

const MAX_TIME = 60
const INITIAL_HINTS = 3

const GameView = () => {
  const [board, setBoard] = useState<number[][]>([])
  const [selectedTile, setSelectedTile] = useState<Position | null>(null)
  const [path, setPath] = useState<Position[] | null>(null)
  const [score, setScore] = useState<number>(0)
  const [time, setTime] = useState<number>(MAX_TIME)
  const [hints, setHints] = useState<number>(INITIAL_HINTS)
  const [nextMatch, setNextMatch] = useState<MatchPair | null>(null)
  const [hintPair, setHintPair] = useState<MatchPair | null>(null)
  const hintTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const initialBoard = createBoard()
    const { board: playableBoard, match } = ensurePlayableBoardState(initialBoard)
    setBoard(playableBoard)
    setNextMatch(match)
    setScore(0)
    setTime(MAX_TIME)
    setHints(INITIAL_HINTS)
    setSelectedTile(null)
    setPath(null)
    setHintPair(null)
  }, [])

  // 타이머
  useEffect(() => {
    if (time <= 0) return

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0.1) {
          return 0
        }
        return prev - 0.1
      })
    }, 100)

    return () => clearInterval(interval)
  }, [time])

  const clearHintIndicators = useCallback(() => {
    if (hintTimeoutRef.current) {
      clearTimeout(hintTimeoutRef.current)
      hintTimeoutRef.current = null
    }
    setHintPair(null)
  }, [])

  const handleTileClick = useCallback(
    (position: Position) => {
      const clickedValue = board[position.x]?.[position.y]
      if (!clickedValue) return

      clearHintIndicators()

      if (!selectedTile) {
        // 첫 번째 타일 선택
        setSelectedTile(position)
        setPath(null)
        return
      }

      if (selectedTile.x === position.x && selectedTile.y === position.y) {
        // 같은 타일 클릭 시 선택 해제
        setSelectedTile(null)
        setPath(null)
        return
      }

      const selectedValue = board[selectedTile.x]?.[selectedTile.y]
      if (!selectedValue) {
        setSelectedTile(position)
        setPath(null)
        return
      }

      // 같은 값인지 확인
      if (clickedValue !== selectedValue) {
        setSelectedTile(position)
        setPath(null)
        return
      }

      const foundPath = findTilePath(board, selectedTile, position)

      if (foundPath) {
        setPath(foundPath)
        const fromPosition = { ...selectedTile }
        const toPosition = { ...position }

        // 잠시 후 타일 제거
        setTimeout(() => {
          setBoard((prev) => {
            const next = prev.map((row) => [...row])
            next[fromPosition.x][fromPosition.y] = 0
            next[toPosition.x][toPosition.y] = 0
            const { board: playableBoard, match, wasShuffled } = ensurePlayableBoardState(next)
            if (wasShuffled) {
              setHints((prev) => Math.max(prev - 1, 0))
            }
            setNextMatch(match)
            setHintPair(null)
            return playableBoard
          })
          setScore((prev) => prev + 10)
          setSelectedTile(null)
          setPath(null)
        }, 500)
      } else {
        // 경로를 찾지 못하면 두 번째 타일을 첫 번째로 승격
        setSelectedTile(position)
        setPath(null)
      }
    },
    [board, selectedTile, clearHintIndicators]
  )

  const handleUseHint = useCallback(() => {
    if (hints <= 0) return

    let match = nextMatch
    if (!match) {
      match = findFirstMatchOnBoard(board)
      setNextMatch(match)
    }

    if (!match) return

    let hintPath = findTilePath(board, match.from, match.to)
    if (!hintPath) {
      const refreshedMatch = findFirstMatchOnBoard(board)
      setNextMatch(refreshedMatch)
      if (!refreshedMatch) return
      const refreshedPath = findTilePath(board, refreshedMatch.from, refreshedMatch.to)
      if (!refreshedPath) return
      match = refreshedMatch
      hintPath = refreshedPath
    } else {
      setNextMatch(match)
    }

    console.log("[힌트] 연결 가능한 한쌍:", match)
    setPath(null)
    setHints((prev) => Math.max(prev - 1, 0))
    setSelectedTile(null)
    setHintPair(match)

    if (hintTimeoutRef.current) {
      clearTimeout(hintTimeoutRef.current)
    }
    hintTimeoutRef.current = setTimeout(() => {
      setHintPair(null)
      hintTimeoutRef.current = null
    }, 1500)
  }, [board, hints, nextMatch])

  useEffect(() => {
    return () => {
      if (hintTimeoutRef.current) {
        clearTimeout(hintTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="flex flex-col">
      <GameHUD
        time={time}
        maxTime={MAX_TIME}
        score={score}
        hints={hints}
        onUseHint={handleUseHint}
        canUseHint={hints > 0 && !!nextMatch}
      />
      <GameArea
        board={board}
        selectedTile={selectedTile}
        onTileClick={handleTileClick}
        path={path}
        hintPair={hintPair}
      />
    </div>
  )
}

export default GameView
