interface StartViewProps {
  onStart: () => void
}

const StartView = ({ onStart }: StartViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-6">
      <h1 className="text-4xl font-bold text-white mb-4">Onet Connect</h1>
      <p className="text-gray-300 mb-8">타일을 연결하여 게임을 시작하세요!</p>
      <button
        onClick={onStart}
        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
      >
        게임 시작
      </button>
    </div>
  )
}

export default StartView

