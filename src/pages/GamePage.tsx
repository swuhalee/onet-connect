import { useCallback, useState } from 'react'
import GameView from '../game/views/GameView'
import StartView from '../game/views/StartView'
import PauseView from '../game/views/PauseView'
import GameOverView from '../game/views/GameOverView'
import NextStageView from '../game/views/NextStageView'
import { useGameStore } from '../game/hooks/gameStore'

const GamePage = () => {
  const [level, setLevel] = useState(1)
  const { status, score, startGame, setStatus } = useGameStore()

  const handleStart = useCallback(() => {
    startGame(level)
  }, [level, startGame])

  const handleResume = useCallback(() => {
    setStatus('PLAYING')
  }, [setStatus])

  const handleNextStage = useCallback(() => {
    const nextLevel = level + 1
    setLevel(nextLevel)
    startGame(nextLevel)
  }, [level, startGame])

  const renderContent = () => {
    switch (status) {
      case 'IDLE':
        return <StartView onStart={handleStart} />
      case 'PLAYING':
      case 'PAUSED':
        return (
          <div className="relative w-full h-full">
            <GameView level={level} />
            {status === 'PAUSED' && (
              <div className="absolute inset-0 z-10 bg-black/50 flex items-center justify-center">
                <PauseView onResume={handleResume} />
              </div>
            )}
          </div>
        )
      case 'GAME_OVER':
        return <GameOverView finalScore={score} onRestart={handleStart} />
      case 'LEVEL_UP':
        return (
          <NextStageView
            level={level}
            score={score}
            onNext={handleNextStage}
          />
        )
      default:
        return <div className="text-white">알 수 없는 상태입니다.</div>
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-[900px] h-[700px] bg-gray-900/90 rounded-lg border border-gray-700 shadow-2xl overflow-hidden relative">
        <div className="w-full h-full flex items-center justify-center">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default GamePage