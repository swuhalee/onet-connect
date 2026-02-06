import React, { useEffect, useRef } from 'react';
import { useSaveScore } from '../../../hooks/useSaveScore';
import { trackGameScore, trackGameDuration } from '../../../utils/analytics';

// 브레이크포인트 불일치로 인해 뷰포트 너비가 정확히 768px일 때 레이아웃 충돌이 발생할 수 있으므로 767px로 설정
export const isMobile = typeof window !== 'undefined'
    ? window.matchMedia('(max-width: 767px)').matches
    : false;
const initialWidth = typeof window !== 'undefined'
    ? Math.min(window.innerWidth, 1000)
    : 1000;

const OnetWebView: React.FC = () => {
    const { mutate: saveScore } = useSaveScore();
    const gameStartTimeRef = useRef<number | null>(null);

    useEffect(() => {
        // 게임 시작 시간 기록
        gameStartTimeRef.current = Date.now();

        // 게임으로부터 메시지를 받는 이벤트 리스너
        const handleMessage = (event: MessageEvent) => {
            const expectedOrigin = window.location.origin;
            if (event.origin !== expectedOrigin) {
                return;
            }
            // 보안을 위해 특정 타입의 메시지만 처리
            if (event.data?.type === 'ONET_GAME_END') {
                const score = Number(event.data?.score);
                if (!Number.isFinite(score)) return;

                // 게임 점수 저장
                saveScore(score);

                // GA4에 게임 점수 이벤트 전송
                trackGameScore(score);

                // 게임 플레이 시간 계산 및 전송
                if (gameStartTimeRef.current) {
                    const gameEndTime = Date.now();
                    const durationSeconds = Math.round((gameEndTime - gameStartTimeRef.current) / 1000);
                    trackGameDuration(durationSeconds);
                }
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [saveScore]);

    return (
        <>
            <iframe
                src="/games/onet/index.html"
                title="Onet Game"
                style={{
                    width: `${initialWidth}px`,
                    aspectRatio: isMobile ? '680 / 1000' : '1000 / 690',
                    border: 'none',
                    display: 'block',
                }}
            />
        </>
    );
};

export default OnetWebView;