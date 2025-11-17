interface GameHUDProps {
  time: number
  maxTime: number
  score: number
  hints: number
}

const GameHUD = ({ time, maxTime, score, hints }: GameHUDProps) => {
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
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">힌트</span>
        <span className="text-lg font-bold">{hints}</span>
      </div>
    </div>
  )
}

export default GameHUD