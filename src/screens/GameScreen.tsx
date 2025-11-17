import { useState, useEffect, useCallback } from "react"
import type { Position } from "../game/gameTypes"
import GameArea from "../views/GameArea"
import GameHUD from "../views/GameHUD"
import { createBoard } from "../game/utils/boardGenerator"
import { findTilePath } from "../game/utils/connectionChecker"

const MAX_TIME = 60
const INITIAL_HINTS = 3

const GameScreen = () => {
  const [board, setBoard] = useState<number[][]>([])
  const [selectedTile, setSelectedTile] = useState<Position | null>(null)
  const [path, setPath] = useState<Position[] | null>(null)
  const [score, setScore] = useState<number>(0)
  const [time, setTime] = useState<number>(MAX_TIME)
  const [hints, setHints] = useState<number>(INITIAL_HINTS)

  useEffect(() => {
    const newBoard = createBoard()
    setBoard(newBoard)
    setScore(0)
    setTime(MAX_TIME)
    setHints(INITIAL_HINTS)
    setSelectedTile(null)
    setPath(null)
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

  const handleTileClick = useCallback(
    (position: Position) => {
      const clickedValue = board[position.x]?.[position.y]
      if (!clickedValue) return

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
            return next
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
    [board, selectedTile]
  )

  return (
    <div className="flex flex-col">
      <GameHUD time={time} maxTime={MAX_TIME} score={score} hints={hints} />
      <GameArea board={board} selectedTile={selectedTile} onTileClick={handleTileClick} path={path} />
    </div>
  )
}

export default GameScreen
