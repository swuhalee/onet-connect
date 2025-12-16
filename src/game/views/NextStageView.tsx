interface NextStageViewProps {
  level: number
  score: number
  onNext: () => void
}

const NextStageView = ({ level, score, onNext }: NextStageViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-6">
      <h1 className="text-4xl font-bold text-white mb-2">스테이지 클리어!</h1>
      <p className="text-gray-300 mb-6">LEVEL {level.toString().padStart(2, '0')}</p>
      <div className="text-center text-gray-200">
        <div className="text-2xl">
          총 점수:{' '}
          <span className="text-yellow-400 font-bold">{score.toLocaleString()}</span>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={onNext}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
        >
          다음 스테이지
        </button>
      </div>
    </div>
  )
}

export default NextStageView

