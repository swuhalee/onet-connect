import { Group } from "react-konva"
import type { Position } from "../game/gameTypes"
import { TILE_SIZE } from "../game/gameConstants"
import GameTile from "./GameTile"

interface GameBoardProps {
  board: number[][]
  onTileClick: (position: Position) => void
  selectedTile?: Position | null
  hintPair?: { from: Position; to: Position } | null
}

const GameBoard = ({ board, onTileClick, selectedTile, hintPair }: GameBoardProps) => {
  return (
    <Group>
      {/* 타일들 */}
      {board.map((row, rowIndex) =>
        row.map((value, colIndex) =>
          value > 0 ? (
            <Group
              key={`${rowIndex}-${colIndex}`}
              x={colIndex * TILE_SIZE}
              y={rowIndex * TILE_SIZE}
            >
              <GameTile
                value={value}
                isSelected={selectedTile?.x === rowIndex && selectedTile?.y === colIndex}
                isHintTarget={
                  !!hintPair &&
                  ((hintPair.from.x === rowIndex && hintPair.from.y === colIndex) ||
                    (hintPair.to.x === rowIndex && hintPair.to.y === colIndex))
                }
                onClick={() => onTileClick({ x: rowIndex, y: colIndex })}
              />
            </Group>
          ) : null
        )
      )}
    </Group>
  )
}

export default GameBoard