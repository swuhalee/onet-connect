interface PauseViewProps {
  onResume: () => void
  onRestart: () => void
  timeRemaining?: number
}

const PauseView = ({ onResume, onRestart, timeRemaining }: PauseViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] gap-6">
      <h1 className="text-4xl font-bold text-white mb-4">일시 정지</h1>
      <p className="text-gray-300">
        {typeof timeRemaining === 'number'
          ? `남은 시간: ${Math.max(timeRemaining, 0).toFixed(1)}초`
          : '게임이 잠시 멈춰 있습니다.'}
      </p>
      <div className="flex gap-4">
        <button
          onClick={onResume}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
        >
          이어하기
        </button>
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors"
        >
          다시 시작
        </button>
      </div>
    </div>
  )
}

export default PauseView

