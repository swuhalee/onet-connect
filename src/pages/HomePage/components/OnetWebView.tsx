import React, { useEffect } from 'react';
import { useSaveScore } from '../../../hooks/useSaveScore';

const OnetWebView: React.FC = () => {
    const { mutate: saveScore } = useSaveScore();

    useEffect(() => {
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
                saveScore(score);
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
                    flexShrink: 0,
                }}
            />
        </>
    );
};

export default OnetWebView;