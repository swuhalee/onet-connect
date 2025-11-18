interface NextStageViewProps {
  level: number
  score: number
  bonus?: number
  onNext: () => void
  onQuit: () => void
}

const NextStageView = ({ level, score, bonus = 500, onNext, onQuit }: NextStageViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] gap-6">
      <h1 className="text-4xl font-bold text-white mb-2">스테이지 클리어!</h1>
      <p className="text-gray-300 mb-6">LEVEL {level.toString().padStart(2, '0')}</p>
      <div className="text-center text-gray-200">
        <div className="text-2xl mb-2">
          현재 점수:{' '}
          <span className="text-yellow-400 font-bold">{score.toLocaleString()}</span>
        </div>
        <div className="text-lg text-green-400">보너스 +{bonus.toLocaleString()}</div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={onNext}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
        >
          다음 스테이지
        </button>
        <button
          onClick={onQuit}
          className="px-8 py-4 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors"
        >
          메인으로
        </button>
      </div>
    </div>
  )
}

export default NextStageView

