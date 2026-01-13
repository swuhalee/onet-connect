import React, { useEffect, useState } from 'react';

const OnetWebView: React.FC = () => {
    const [finalScore, setFinalScore] = useState<number | null>(null);

    useEffect(() => {
        // 게임으로부터 메시지를 받는 이벤트 리스너
        const handleMessage = (event: MessageEvent) => {
            // Validate origin - adjust to match your game's origin
            const expectedOrigin = window.location.origin;
            if (event.origin !== expectedOrigin) {
                return;
            }
            // 보안을 위해 특정 타입의 메시지만 처리
            if (event.data.type === 'ONET_GAME_END') {
                const score = event.data.score;
                console.log("React 수신 점수:", score);
                setFinalScore(score);
                // 여기서 백엔드 API 호출 (랭킹 저장 등)
                // saveScoreToRanking(score);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    return (
        <>
            <iframe
                src="/games/onet/index.html"
                title="Onet Game"
                style={{
                    width: '1000px',
                    height: '690px',
                }}
            />
        </>
    );
};

export default OnetWebView;