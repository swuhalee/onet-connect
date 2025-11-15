import { Link, useLocation } from '@tanstack/react-router'

const AppLayout = () => {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <header className="bg-white fixed top-0 left-0 right-0 border-b border-[#DDDDDD]">
      <div className="w-[1200px] h-[80px] mx-auto flex items-center justify-between">
        {/* header-left: 브랜딩 + 네비게이션 */}
        <div className="flex items-center gap-[24px]">
          {/* 브랜딩 */}
          <a href="/">
            <img src="/logo.svg" alt="Onet Connect" />
          </a>

          {/* 네비게이션 링크 */}
          <div className="flex items-center gap-[4px] h-[80px]">
            <Link
              to="/"
              className={`px-[12px] h-[80px] flex items-center text-[15px] font-medium transition-all duration-300 ${
                currentPath === '/' 
                  ? '!text-[#BF40BF] border-b-2 border-[#BF40BF]' 
                  : '!text-[#707070] border-b-2 border-transparent'
              }`}
            >
              게임
            </Link>
            <Link
              to="/ranking"
              className={`px-[12px] h-[80px] flex items-center text-[15px] font-medium transition-all duration-300 ${
                currentPath === '/ranking' 
                  ? '!text-[#BF40BF] border-b-2 border-[#BF40BF]' 
                  : '!text-[#707070] border-b-2 border-transparent'
              }`}
            >
              랭킹
            </Link>
          </div>
        </div>

        {/* header-right: 사용자 액션 버튼 */}
        <div className="flex items-center gap-[14px]">
          <button className="bg-[#BF40BF] px-[12px] py-[6px] text-white text-[15px] font-medium rounded-none hover:border-none cursor-pointer">
            가입
          </button>
          <button className="bg-[#E0E0E0] px-[12px] py-[6px] text-[#707070] text-[15px] font-medium rounded-none hover:border-none cursor-pointer">
            로그인
          </button>
        </div>
      </div>
    </header>
  )
}

export default AppLayout