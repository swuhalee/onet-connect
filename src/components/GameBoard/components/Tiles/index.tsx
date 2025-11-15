import { useMemo } from "react";
import { Group, Image, Rect } from "react-konva";
import { GRID_SIZE, TILE_SIZE, EMPTY } from "../../constants";

const PADDING = GRID_SIZE;

interface TilesProps {
    board: number[][];
    images: HTMLImageElement[];
}

export default function Tiles({ board, images }: TilesProps) {
    const tiles = useMemo(() => {
        return board.map((row, rowIndex) =>
            row.map((tile, colIndex) => {
                if (tile === EMPTY || !images[tile - 1]) return null;

                const centerX = colIndex * GRID_SIZE + GRID_SIZE / 2 + PADDING;
                const centerY = rowIndex * GRID_SIZE + GRID_SIZE / 2 + PADDING;
                const tileRadius = TILE_SIZE / 2;

                return (
                    <Group key={`tile-${rowIndex}-${colIndex}`} listening={false}>
                        <Image
                            x={centerX - tileRadius}
                            y={centerY - tileRadius}
                            width={TILE_SIZE}
                            height={TILE_SIZE}
                            image={images[tile - 1]}
                            imageSmoothingEnabled={true}
                        />
                        <Rect
                            x={centerX - tileRadius}
                            y={centerY - tileRadius}
                            width={TILE_SIZE}
                            height={TILE_SIZE}
                            stroke="#000"
                            strokeWidth={0.2}
                        />
                    </Group>
                );
            })
        ).flat().filter(Boolean);
    }, [board, images]);

    return <Group>{tiles}</Group>;
}

