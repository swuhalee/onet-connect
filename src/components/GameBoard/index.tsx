import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { Stage, Layer, Group } from "react-konva";
import { createBoard, getTilePosition } from "./utils/board";
import { handleTileClick } from "./utils/tileClick";
import type { Position } from "./types";
import { COLS, GRID_SIZE, ROWS, TILE_IMAGES } from "./constants";
import PathLine from "./components/PathLine";
import SelectionHighlight from "./components/SelectionHighlight";
import Tiles from "./components/Tiles";
import Grid from "./components/Grid";

export default function GameBoard() {
    const [board, setBoard] = useState<number[][]>(() => createBoard());
    const [selected, setSelected] = useState<Position | null>(null);
    const [path, setPath] = useState<Position[] | null>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
    const containerRef = useRef<HTMLDivElement>(null);

    // 이미지 로드
    useEffect(() => {
        const loadImages = async () => {
            const imagePromises = TILE_IMAGES.map(async (imageName) => {
                const img = document.createElement('img');
                try {
                    img.src = `/tiles/${imageName}`;
                    await new Promise<void>((resolve, reject) => {
                        img.onload = () => resolve();
                        img.onerror = reject;
                        setTimeout(() => reject(new Error('Image load timeout')), 5000);
                    });
                    return img;
                } catch (error) {
                    console.error(`Failed to load image: ${imageName}`, error);
                    // 폴백: 색상으로 된 타일 생성
                    const fallbackImg = document.createElement('img');
                    const canvas = document.createElement('canvas');
                    canvas.width = 80;
                    canvas.height = 80;
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#f9ca24', '#6c5ce7'];
                        const color = colors[Math.floor(Math.random() * colors.length)];
                        ctx.fillStyle = color;
                        ctx.fillRect(0, 0, 80, 80);
                        ctx.strokeStyle = '#333';
                        ctx.lineWidth = 3;
                        ctx.strokeRect(0, 0, 80, 80);
                    }
                    fallbackImg.src = canvas.toDataURL();
                    return fallbackImg;
                }
            });

            try {
                const results = await Promise.all(imagePromises);
                setImages(results);
            } catch (error) {
                console.error('Failed to load images:', error);
            }
        };

        loadImages().catch(console.error);
    }, []);

    // 컨테이너 크기에 맞춰 Stage 크기 조정
    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setStageSize({
                    width: rect.width || 800,
                    height: rect.height || 600
                });
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    // 스케일 계산 (보드가 Stage에 맞도록)
    const { scale, offsetX, offsetY } = useMemo(() => {
        const boardWidth = COLS * GRID_SIZE + GRID_SIZE * 2;
        const boardHeight = ROWS * GRID_SIZE + GRID_SIZE * 2;
        const calculatedScale = Math.min(
            stageSize.width / boardWidth,
            stageSize.height / boardHeight,
            1 // 최대 1배까지만 확대
        );
        
        return {
            scale: calculatedScale,
            offsetX: (stageSize.width - boardWidth * calculatedScale) / 2,
            offsetY: (stageSize.height - boardHeight * calculatedScale) / 2
        };
    }, [stageSize]);

    // 클릭 핸들러
    const handleStageClick = useCallback((e: any) => {
        const stage = e.target.getStage();
        const pointerPos = stage.getPointerPosition();
        
        if (!pointerPos || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const clientX = rect.left + pointerPos.x;
        const clientY = rect.top + pointerPos.y;

        const tilePos = getTilePosition(clientX, clientY, rect);
        if (!tilePos) return;

        handleTileClick(
            {
                clientX,
                clientY,
            } as React.MouseEvent<HTMLCanvasElement>,
            board,
            selected,
            setSelected,
            setPath,
            setBoard,
            (cx: number, cy: number) => getTilePosition(cx, cy, rect)
        );
    }, [board, selected]);



    return (
        <div
            ref={containerRef}
            className="relative overflow-auto max-w-full max-h-full w-full h-full"
            style={{ backgroundColor: "#000" }}
        >
            <Stage
                width={stageSize.width}
                height={stageSize.height}
                onClick={handleStageClick}
                style={{ cursor: "pointer" }}
            >
                <Layer
                    scaleX={scale}
                    scaleY={scale}
                    x={offsetX}
                    y={offsetY}
                >
                    {/* 그리드 */}
                    <Group>
                        <Grid />
                    </Group>

                    {/* 타일들 */}
                    <Tiles board={board} images={images} />

                    {/* 선택 하이라이트 */}
                    <SelectionHighlight selected={selected} />

                    {/* 경로 */}
                    <PathLine path={path} />
                </Layer>
            </Stage>
        </div>
    );
}
