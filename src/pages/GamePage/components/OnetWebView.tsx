import React, { useEffect, useRef } from 'react';
import { useSaveScore } from '../../../hooks/useSaveScore';
import { trackGameScore, trackGameDuration } from '../../../utils/analytics';

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
                    width: '1000px',
                    height: '690px',
                    flexShrink: 0,
                }}
            />
        </>
    );
};

export default OnetWebView;