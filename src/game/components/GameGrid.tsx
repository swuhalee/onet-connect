import { Group, Rect } from "react-konva"
import { TILE_SIZE, ROWS, COLS, GRID_STROKE_WIDTH } from "../gameConstants"

const GameGrid = () => {
  return (
    <Group>
      {Array.from({ length: ROWS + 2 }, (_, row) =>
        Array.from({ length: COLS + 2 }, (_, col) => {
          const isOuterEdge = row === 0 || row === ROWS + 1 || col === 0 || col === COLS + 1
          
          return (
            <Rect
              key={`cell-${row}-${col}`}
              x={col * TILE_SIZE}
              y={row * TILE_SIZE}
              width={TILE_SIZE - GRID_STROKE_WIDTH}
              height={TILE_SIZE - GRID_STROKE_WIDTH}
              fill={isOuterEdge ? "black" : "#3C3C50"}
              stroke={isOuterEdge ? "black" : "black"}
              strokeWidth={GRID_STROKE_WIDTH}
              listening={false}
            />
          )
        })
      )}
    </Group>
  )
}

export default GameGrid

