import { createFileRoute } from '@tanstack/react-router'
import GameBoard from '../components/GameBoard'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="w-full max-w-[1200px] mx-auto flex items-center justify-center">
    <div className="py-[30px]">
      <GameBoard />
    </div>
  </div>
}
