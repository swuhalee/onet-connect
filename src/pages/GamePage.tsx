import { useCallback, useState } from 'react'
import GameView from '../game/views/GameView'
import StartView from '../game/views/StartView'
import PauseView from '../game/views/PauseView'
import GameOverView from '../game/views/GameOverView'
import NextStageView from '../game/views/NextStageView'
import { useGameStore } from '../game/hooks/gameStore'

const GamePage = () => {
  const [level, setLevel] = useState(1)
  const { status, score, time, startGame, pauseGame, setStatus } = useGameStore()

  const handleStart = useCallback(() => {
    startGame(level)
  }, [level, startGame])

  const handleRestart = useCallback(() => {
    startGame(level)
  }, [level, startGame])

  const handleResume = useCallback(() => {
    setStatus('PLAYING')
  }, [setStatus])

  const handlePause = useCallback(() => {
    pauseGame()
  }, [pauseGame])

  const handleNextStage = useCallback(() => {
    const nextLevel = level + 1
    setLevel(nextLevel)
    startGame(nextLevel)
  }, [level, startGame])

  const handleQuitToMenu = useCallback(() => {
    setLevel(1)
    setStatus('IDLE')
  }, [setStatus])

  const renderContent = () => {
    switch (status) {
      case 'IDLE':
        return <StartView onStart={handleStart} />
      case 'PLAYING':
        return (
          <div className="relative w-full">
            <button
              type="button"
              onClick={handlePause}
              className="absolute right-4 top-4 z-10 px-4 py-2 bg-gray-900/80 text-white rounded-lg border border-gray-700 hover:bg-gray-900"
            >
              일시 정지
            </button>
            <GameView />
          </div>
        )
      case 'PAUSED':
        return <PauseView onResume={handleResume} onRestart={handleRestart} timeRemaining={time} />
      case 'GAME_OVER':
        return <GameOverView finalScore={score} onRestart={handleRestart} />
      case 'LEVEL_UP':
        return (
          <NextStageView
            level={level}
            score={score}
            bonus={500}
            onNext={handleNextStage}
            onQuit={handleQuitToMenu}
          />
        )
      default:
        return <div className="text-white">알 수 없는 상태입니다.</div>
    }
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto min-h-screen flex items-center justify-center px-4">
      {renderContent()}
    </div>
  )
}

export default GamePage