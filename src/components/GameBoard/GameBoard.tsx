import React, { useRef, useEffect, useState } from "react";
import { createBoard, getGridPosition } from "./utils/boardUtils";
import { drawGrid, drawTiles, drawSelection, drawPath } from "./utils/canvasUtils";
import { handleCanvasClick } from "./utils/gameUtils";
import type { Point } from "./types/point";
import { COLS, GRID_SIZE, ROWS, TILE_IMAGES } from "./CONST";

export default function GameBoard() {
    const [board, setBoard] = useState<number[][]>(() => createBoard());
    const [selected, setSelected] = useState<Point | null>(null);
    const [path, setPath] = useState<Point[] | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);

    // 이미지 로드
    useEffect(() => {
        const loadImages = async () => {
            // 이미지 로딩을 병렬로 처리하여 성능 향상
            const imagePromises = TILE_IMAGES.map(async (imageName) => {
                const img = new Image();
                
                try {
                    img.src = `/tiles/${imageName}`;

                    await new Promise((resolve, reject) => {
                        img.onload = resolve;
                        img.onerror = reject;
                        // 타임아웃 설정
                        setTimeout(() => reject(new Error('Image load timeout')), 5000);
                    });

                    return img;
                } catch (error) {
                    console.error(`Failed to load image: ${imageName}`, error);
                    // 폴백: 색상으로 된 타일 생성
                    const fallbackImg = new Image();
                    const canvas = document.createElement('canvas');
                    canvas.width = 80; // 폴백 이미지 크기 증가
                    canvas.height = 80;
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        // 랜덤 색상으로 타일 생성
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

    // 클릭한 위치가 어떤 격자 셀인지 찾기 (캔버스 ref를 사용하는 래퍼 함수)
    const getGridPositionWrapper = (clientX: number, clientY: number): Point | null => {
        const rect = canvasRef.current?.getBoundingClientRect() || null;
        return getGridPosition(clientX, clientY, rect);
    };

    // 캔버스 클릭 핸들러 (래퍼 함수)
    const handleCanvasClickWrapper = (event: React.MouseEvent<HTMLCanvasElement>) => {
        handleCanvasClick(
            event,
            board,
            selected,
            setSelected,
            setPath,
            setBoard,
            getGridPositionWrapper
        );
    };

    // 캔버스 렌더링
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // 고해상도 디스플레이 지원을 위한 캔버스 스케일링
        const devicePixelRatio = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        
        // 캔버스의 실제 크기를 디바이스 픽셀 비율에 맞게 조정
        canvas.width = rect.width * devicePixelRatio;
        canvas.height = rect.height * devicePixelRatio;
        
        // CSS 크기는 그대로 유지
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        
        // 컨텍스트 스케일 조정
        ctx.scale(devicePixelRatio, devicePixelRatio);

        // 이미지 렌더링 품질 개선 설정
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // 캔버스 초기화
        ctx.clearRect(0, 0, rect.width, rect.height);

        // 격자 그리기
        drawGrid(ctx);

        // 타일 그리기
        drawTiles(ctx, board, images);

        // 선택된 타일 하이라이트
        drawSelection(ctx, selected);

        // 경로 그리기
        drawPath(ctx, path);
    }, [board, selected, path, images]);

    return (
        <>
            <div className="relative overflow-auto max-w-full max-h-full">
                <canvas
                    ref={canvasRef}
                    width={COLS * GRID_SIZE + GRID_SIZE * 2} // 좌우 패딩 추가
                    height={ROWS * GRID_SIZE + GRID_SIZE * 2} // 상하 패딩 추가
                    onClick={handleCanvasClickWrapper}
                    className="border-2 border-gray-300 cursor-pointer"
                    style={{ backgroundColor: "#000" }}
                />
            </div>
        </>
    );
}
