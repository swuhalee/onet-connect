import { useMemo } from "react";
import { Line } from "react-konva";
import { COLS, GRID_SIZE, ROWS } from "../../constants";

const PADDING = GRID_SIZE;

export default function Grid() {
    const gridLines = useMemo(() => {
        const lines: React.ReactElement[] = [];
        
        // 수직선
        for (let col = 0; col <= COLS; col++) {
            lines.push(
                <Line
                    key={`v-${col}`}
                    points={[
                        col * GRID_SIZE + PADDING, PADDING,
                        col * GRID_SIZE + PADDING, ROWS * GRID_SIZE + PADDING
                    ]}
                    stroke="#ddd"
                    strokeWidth={1}
                    listening={false}
                />
            );
        }

        // 수평선
        for (let row = 0; row <= ROWS; row++) {
            lines.push(
                <Line
                    key={`h-${row}`}
                    points={[
                        PADDING, row * GRID_SIZE + PADDING,
                        COLS * GRID_SIZE + PADDING, row * GRID_SIZE + PADDING
                    ]}
                    stroke="#ddd"
                    strokeWidth={1}
                    listening={false}
                />
            );
        }

        return lines;
    }, []);

    return <>{gridLines}</>;
}

