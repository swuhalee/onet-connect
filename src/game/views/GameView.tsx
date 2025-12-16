import { useState, useEffect, useCallback, useRef } from "react"
import type { Position, GameStatus } from "../gameTypes"
import GameArea from "../components/GameArea"
import GameHUD from "../components/GameHUD"
import { createBoard } from "../utils/boardGenerator"
import { findTilePath } from "../utils/connectionChecker"
import {
  ensurePlayableBoardState,
  findFirstMatchOnBoard,
  type MatchPair,
} from "../utils/hintManager"
import { useGameStore } from "../hooks/gameStore"
import {
  initializeTimeBonusState,
  checkTimeBonuses,
  cleanupTimeBonusState,
  type TimeBonusState,
} from "../utils/timeBonusManager"

const MAX_TIME = 60
const INITIAL_HINTS = 3

interface GameViewProps {
  level: number
}

const GameView = ({ level }: GameViewProps) => {
  const { endGame, updateScore, status, pauseGame, score } = useGameStore()

  const [board, setBoard] = useState<number[][]>([])
  const [selectedTile, setSelectedTile] = useState<Position | null>(null)
  const [path, setPath] = useState<Position[] | null>(null)
  const [time, setTime] = useState<number>(MAX_TIME)
  const [hints, setHints] = useState<number>(INITIAL_HINTS)
  const [nextMatch, setNextMatch] = useState<MatchPair | null>(null)
  const [hintPair, setHintPair] = useState<MatchPair | null>(null)
  const [timeBonusMessage, setTimeBonusMessage] = useState<string | null>(null)

  const hintTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastStatusRef = useRef<GameStatus>('IDLE')
  const timeBonusStateRef = useRef<TimeBonusState | null>(null)

  useEffect(() => {
    const previousStatus = lastStatusRef.current
    const isNowPlaying = status === 'PLAYING'

    if (isNowPlaying && previousStatus !== 'PLAYING' && previousStatus !== 'PAUSED') {
      const initialBoard = createBoard()
      const { board: playableBoard, match } = ensurePlayableBoardState(initialBoard)
      setBoard(playableBoard)
      setNextMatch(match)
      setTime(MAX_TIME)
      setHints(INITIAL_HINTS)
      setSelectedTile(null)
      setPath(null)
      setHintPair(null)
      
      if (timeBonusStateRef.current) {
        cleanupTimeBonusState(timeBonusStateRef.current)
      }
      timeBonusStateRef.current = initializeTimeBonusState(level, playableBoard)
    }

    lastStatusRef.current = status
  }, [status])

  useEffect(() => {
    if (time <= 0 || status !== 'PLAYING') return

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0.1) {
          endGame('GAME_OVER')
          return 0
        }
        return prev - 0.1
      })
    }, 100)

    return () => clearInterval(interval)
  }, [time, status, endGame])

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
        setSelectedTile(position)
        setPath(null)
        return
      }

      if (selectedTile.x === position.x && selectedTile.y === position.y) {
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

        // 경로 애니메이션 표현을 위해 잠시 후 타일 제거
        setTimeout(() => {
          const removedTileIds = [
            board[fromPosition.x]?.[fromPosition.y],
            board[toPosition.x]?.[toPosition.y],
          ].filter(id => id > 0)

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

            // 시간 보너스 체크
            if (timeBonusStateRef.current && status === 'PLAYING') {
              timeBonusStateRef.current = checkTimeBonuses(
                timeBonusStateRef.current,
                removedTileIds,
                Date.now(),
                playableBoard,
                level,
                (amount, reason) => {
                  setTime((prev) => prev + amount)
                  setTimeBonusMessage(reason)
                  setTimeout(() => setTimeBonusMessage(null), 2000)
                }
              )
            }

            // 보드가 완전히 비었는지 확인 (ensurePlayableBoardState 이후)
            const hasRemainingTiles = playableBoard.some(row => row.some(cell => cell !== 0))

            // 보드가 완전히 비었으면 레벨 업
            if (!hasRemainingTiles && status === 'PLAYING') {
              setTimeout(() => {
                endGame('LEVEL_UP')
              }, 100)
            }

            return playableBoard
          })
          updateScore(10)
          setSelectedTile(null)
          setPath(null)
        }, 500)
      } else {
        setSelectedTile(position)
        setPath(null)
      }
    },
    [board, selectedTile, clearHintIndicators, status, endGame, updateScore]
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
      if (timeBonusStateRef.current) {
        cleanupTimeBonusState(timeBonusStateRef.current)
      }
    }
  }, [])

  return (
    <div className="flex flex-col w-full h-full relative">
      <GameHUD
        time={time}
        maxTime={MAX_TIME}
        score={score}
        hints={hints}
        onUseHint={handleUseHint}
        canUseHint={hints > 0 && !!nextMatch}
        onPause={pauseGame}
      />
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <GameArea
          board={board}
          selectedTile={selectedTile}
          onTileClick={handleTileClick}
          path={path}
          hintPair={hintPair}
        />
      </div>
      {timeBonusMessage && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-bold text-lg animate-bounce">
          +{timeBonusMessage}
        </div>
      )}
    </div>
  )
}

export default GameView
