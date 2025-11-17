import { Stage, Layer } from "react-konva"
import type { Position } from "../game/gameTypes"
import GameBoard from "./GameBoard"
import GameGrid from "./GameGrid"
import PathLineRenderer from "./PathLineRenderer"
import { COLS, GRID_STROKE_WIDTH, ROWS, TILE_SIZE } from "../game/gameConstants"

interface GameAreaProps {
  board: number[][]
  selectedTile: Position | null
  onTileClick: (position: Position) => void
  path?: Position[] | null
  hintPair?: { from: Position; to: Position } | null
}

const GameArea = ({
  board,
  selectedTile,
  onTileClick,
  path = null,
  hintPair = null,
}: GameAreaProps) => {
  const stageWidth = (COLS + 2) * (TILE_SIZE + GRID_STROKE_WIDTH)
  const stageHeight = (ROWS + 2) * (TILE_SIZE + GRID_STROKE_WIDTH)

  return (
    <div className="flex justify-center p-4">
      <Stage width={stageWidth} height={stageHeight}>
        <Layer>
          <GameGrid />
        </Layer>
        <Layer x={TILE_SIZE} y={TILE_SIZE}>
          <GameBoard
            board={board}
            onTileClick={onTileClick}
            selectedTile={selectedTile}
            hintPair={hintPair}
          />
        </Layer>
        <Layer x={TILE_SIZE} y={TILE_SIZE}>
          <PathLineRenderer path={path} />
        </Layer>
      </Stage>
    </div>
  )
}

export default GameArea

