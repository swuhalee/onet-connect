interface PauseViewProps {
  onResume: () => void
}

const PauseView = ({ onResume }: PauseViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-6">
      <h1 className="text-4xl font-bold text-white mb-4">일시 정지</h1>
      <button
        onClick={onResume}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
      >
        이어하기
      </button>
    </div>
  )
}

export default PauseView

