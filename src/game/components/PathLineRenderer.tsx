import { useMemo } from "react"
import { Line } from "react-konva"
import type { Position } from "../gameTypes"
import { GRID_STROKE_WIDTH, TILE_SIZE } from "../gameConstants"

interface PathLineRendererProps {
  path: Position[] | null
}

const PathLineRenderer = ({ path }: PathLineRendererProps) => {
  const pathLine = useMemo(() => {
    if (!path || path.length < 2) return null

    const points: number[] = []

    path.forEach((position) => {
      // Position의 x는 row, y는 col
      // 타일 배치 위치: col * TILE_SIZE, row * TILE_SIZE
      // 타일의 실제 크기: TILE_SIZE + strokeWidth * 2 (outer stroke)
      // 타일의 중심점: 배치 위치 + 실제 크기 / 2
      const actualTileSize = TILE_SIZE + GRID_STROKE_WIDTH * 2
      const x = position.y * TILE_SIZE + actualTileSize / 2
      const y = position.x * TILE_SIZE + actualTileSize / 2

      points.push(x, y)
    })

    return (
      <Line
        points={points}
        stroke="red"
        strokeWidth={4}
        listening={false}
      />
    )
  }, [path])

  if (!pathLine) return null

  return (
    <>
      {pathLine}
    </>
  )
}

export default PathLineRenderer