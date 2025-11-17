import { useEffect, useState } from "react"
import { Group, Image, Rect } from "react-konva"
import { GRID_STROKE_WIDTH, TILE_SIZE } from "../game/gameConstants"

const COLORS = [
  '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#f9ca24', '#6c5ce7',
  '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43', '#ee5a6f',
  '#c44569', '#f8b500', '#10ac84', '#ee5a52', '#0abde3', '#5f27cd',
  '#00d2d3', '#ff6348', '#ffa502', '#2ed573'
]

interface GameTileProps {
  value: number
  isSelected: boolean
  onClick: () => void
}

const GameTile = ({ value, isSelected, onClick }: GameTileProps) => {
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null)
  
  const fallbackColor = value >= 1 && value <= 22 ? COLORS[value - 1] : COLORS[0]

  useEffect(() => {
    if (value < 1 || value > 22) {
      setImageElement(null)
      return
    }

    const img = document.createElement('img')
    img.src = `/tiles/${value}.png`
    img.onload = () => setImageElement(img)
    img.onerror = () => setImageElement(null)
  }, [value])

  return (
    <Group onClick={onClick}>
      {imageElement ? (
        <Image width={TILE_SIZE - GRID_STROKE_WIDTH} height={TILE_SIZE - GRID_STROKE_WIDTH} image={imageElement} />
      ) : (
        <Rect width={TILE_SIZE - GRID_STROKE_WIDTH} height={TILE_SIZE - GRID_STROKE_WIDTH} fill={fallbackColor} />
      )}
      {isSelected && (
        <Group x={2} y={2}>
          <Rect
            width={TILE_SIZE - GRID_STROKE_WIDTH * 5}
            height={TILE_SIZE - GRID_STROKE_WIDTH * 5}
            fill="blue"
            opacity={0.2}
          />
          <Rect
            width={TILE_SIZE - GRID_STROKE_WIDTH * 5}
            height={TILE_SIZE - GRID_STROKE_WIDTH * 5}
            stroke="red"
            strokeWidth={GRID_STROKE_WIDTH * 3}
          />
        </Group>
      )}
    </Group>
  )
}

export default GameTile