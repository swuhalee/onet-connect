interface GameOverViewProps {
  finalScore: number
  onRestart: () => void
}

const GameOverView = ({ finalScore, onRestart }: GameOverViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] gap-6">
      <h1 className="text-4xl font-bold text-white mb-4">게임 오버</h1>
      <div className="text-2xl text-gray-300 mb-8">
        최종 점수: <span className="text-yellow-400 font-bold">{finalScore.toLocaleString()}</span>
      </div>
      <button
        onClick={onRestart}
        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
      >
        다시 시작
      </button>
    </div>
  )
}

export default GameOverView

