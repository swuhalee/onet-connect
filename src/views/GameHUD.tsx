interface GameHUDProps {
  time: number
  maxTime: number
  score: number
  hints: number
  onUseHint: () => void
  canUseHint: boolean
}

const GameHUD = ({ time, maxTime, score, hints, onUseHint, canUseHint }: GameHUDProps) => {
  const timePercentage = (time / maxTime) * 100

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-800 text-white">
      {/* 시간바 */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium min-w-[60px]">시간</span>
          <div className="flex-1 h-6 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${timePercentage}%` }}
            />
          </div>
          <span className="text-sm min-w-[50px] text-right">{Math.ceil(time)}초</span>
        </div>
      </div>

      {/* 스코어 */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">스코어</span>
        <span className="text-lg font-bold">{score.toLocaleString()}</span>
      </div>

      {/* 힌트 */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">힌트</span>
          <span className="text-lg font-bold">{hints}</span>
        </div>
        <button
          type="button"
          onClick={onUseHint}
          disabled={!canUseHint}
          className={`px-3 py-1 rounded-md text-sm font-semibold transition ${
            canUseHint
              ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          힌트 사용
        </button>
      </div>
    </div>
  )
}

export default GameHUD