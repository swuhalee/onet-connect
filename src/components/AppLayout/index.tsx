import { Link, useLocation } from '@tanstack/react-router'
import SignInButton from '../SignInButton'
import SignUpButton from '../SignUpButton'

const AppLayout = () => {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <header className="bg-white dark:bg-[#2C2C40] sticky top-0 z-50 border-b border-[#DDDDDD] dark:border-[#3C3C50]">
      <div className="w-full max-w-[1200px] h-[80px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-[24px]">
          <a href="/">
            <img src="/logo.svg" alt="Onet Connect" />
          </a>
          <div className="flex items-center gap-[4px] h-[80px]">
            <Link
              to="/"
              className={`px-[12px] h-[80px] flex items-center text-[15px] font-medium transition-all duration-300 ${currentPath === '/'
                  ? '!text-[#BF40BF] dark:!text-[#DDA0DD] border-b-2 border-[#BF40BF] dark:border-[#DDA0DD]'
                  : '!text-[#707070] dark:!text-[#E0E0E0] border-b-2 border-transparent'
                }`}
            >
              게임
            </Link>
            <Link
              to="/ranking"
              className={`px-[12px] h-[80px] flex items-center text-[15px] font-medium transition-all duration-300 ${currentPath === '/ranking'
                  ? '!text-[#BF40BF] dark:!text-[#DDA0DD] border-b-2 border-[#BF40BF] dark:border-[#DDA0DD]'
                  : '!text-[#707070] dark:!text-[#E0E0E0] border-b-2 border-transparent'
                }`}
            >
              랭킹
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-[14px]">
          <SignUpButton />
          <SignInButton />
        </div>
      </div>
    </header>
  )
}

export default AppLayout