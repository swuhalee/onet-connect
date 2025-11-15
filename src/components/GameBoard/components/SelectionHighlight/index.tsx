import { useMemo } from "react";
import { Rect } from "react-konva";
import type { Position } from "../../types";
import { GRID_SIZE, TILE_SIZE } from "../../constants";

const PADDING = GRID_SIZE;

interface SelectionHighlightProps {
    selected: Position | null;
}

export default function SelectionHighlight({ selected }: SelectionHighlightProps) {
    const highlight = useMemo(() => {
        if (!selected) return null;

        const centerX = selected.y * GRID_SIZE + GRID_SIZE / 2 + PADDING;
        const centerY = selected.x * GRID_SIZE + GRID_SIZE / 2 + PADDING;
        const tileRadius = TILE_SIZE / 2;
        const highlightSize = TILE_SIZE + 6;

        return (
            <Rect
                x={centerX - tileRadius - 3}
                y={centerY - tileRadius - 3}
                width={highlightSize}
                height={highlightSize}
                stroke="#ff6b6b"
                strokeWidth={3}
                listening={false}
            />
        );
    }, [selected]);

    return highlight;
}

