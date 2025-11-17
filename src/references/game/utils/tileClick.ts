import { EMPTY } from "../constants";
import type { Position } from "../types";
import { findTilePath } from "./path";
import { playTileClickSound, playMatchSuccessSound } from "./sounds";

/**
 * 타일 클릭 이벤트를 처리합니다.
 * @param event 마우스 이벤트
 * @param board 현재 게임 보드
 * @param selectedTile 현재 선택된 타일
 * @param setSelectedTile 선택된 타일 설정 함수
 * @param setPath 경로 설정 함수
 * @param setBoard 보드 설정 함수
 * @param getTilePosition 타일 위치 구하는 함수
 */
export function handleTileClick(
    event: React.MouseEvent<HTMLCanvasElement>,
    board: number[][],
    selectedTile: Position | null,
    setSelectedTile: (position: Position | null) => void,
    setPath: (path: Position[] | null) => void,
    setBoard: (board: number[][]) => void,
    getTilePosition: (clientX: number, clientY: number) => Position | null
): void {
    const clickedTile = getTilePosition(event.clientX, event.clientY);
    if (!clickedTile) return;

    const { x: clickedRow, y: clickedCol } = clickedTile;
    
    if (board[clickedRow][clickedCol] === EMPTY) return;

    if (!selectedTile) {
        // 첫 번째 타일 선택 시 클릭 사운드 재생
        playTileClickSound().catch(console.error);
        setSelectedTile({ x: clickedRow, y: clickedCol });
        setPath(null);
    } else {
        // 같은 타일을 다시 클릭한 경우 선택 해제
        if (selectedTile.x === clickedRow && selectedTile.y === clickedCol) {
            setSelectedTile(null);
            setPath(null);
            return;
        }
        
        // 다른 종류의 타일을 클릭한 경우 선택 해제
        if (board[selectedTile.x][selectedTile.y] !== board[clickedRow][clickedCol]) {
            setSelectedTile(null);
            setPath(null);
            return;
        }

        // 매칭 가능한 경로 찾기
        const matchingPath = findTilePath(board, selectedTile, { x: clickedRow, y: clickedCol });
        if (matchingPath) {
            setPath(matchingPath);
            // 매칭 성공 시 매칭 사운드만 재생
            playMatchSuccessSound().catch(console.error);
            // 잠시 후 타일 제거
            setTimeout(() => {
                const updatedBoard = board.map(row => [...row]);
                updatedBoard[selectedTile.x][selectedTile.y] = EMPTY;
                updatedBoard[clickedRow][clickedCol] = EMPTY;
                setBoard(updatedBoard);
                setSelectedTile(null);
                setPath(null);
            }, 500);
        } else {
            // 매칭 실패 시 클릭 사운드 재생
            playTileClickSound().catch(console.error);
            setSelectedTile(null);
            setPath(null);
        }
    }
} 