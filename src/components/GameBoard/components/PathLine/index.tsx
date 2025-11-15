import { useMemo } from "react";
import { Line } from "react-konva";
import type { Position } from "../../types";
import { COLS, GRID_SIZE, ROWS } from "../../constants";

const PADDING = GRID_SIZE;

interface PathLineProps {
    path: Position[] | null;
}

export default function PathLine({ path }: PathLineProps) {
    const pathLine = useMemo(() => {
        if (!path || path.length < 2) return null;

        const points: number[] = [];
        
        path.forEach((position) => {
            let x, y;
            
            if (position.x < 0 || position.x >= ROWS || position.y < 0 || position.y >= COLS) {
                x = Math.max(
                    PADDING - GRID_SIZE / 2,
                    Math.min(
                        position.y * GRID_SIZE + GRID_SIZE / 2 + PADDING,
                        COLS * GRID_SIZE + GRID_SIZE / 2 + PADDING
                    )
                );
                y = Math.max(
                    PADDING - GRID_SIZE / 2,
                    Math.min(
                        position.x * GRID_SIZE + GRID_SIZE / 2 + PADDING,
                        ROWS * GRID_SIZE + GRID_SIZE / 2 + PADDING
                    )
                );
            } else {
                x = position.y * GRID_SIZE + GRID_SIZE / 2 + PADDING;
                y = position.x * GRID_SIZE + GRID_SIZE / 2 + PADDING;
            }
            
            points.push(x, y);
        });

        return (
            <Line
                points={points}
                stroke="#ff6b6b"
                strokeWidth={4}
                lineCap="round"
                lineJoin="round"
                listening={false}
            />
        );
    }, [path]);

    return pathLine;
}

