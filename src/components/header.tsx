import { PATH, TOKEN_KEY } from "@/constants/common"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

export const Header = () => {
  const router = useRouter()

  const handleLogout = () => {
    Cookies.remove(TOKEN_KEY)
    router.push(PATH.LOGIN)
  }

  return (
    <div className="h-30 bg-black flex items-center justify-between px-4 rounded-lg">
      <div className="text-4xl font-bold text-white mb-2">Investor Dashboard</div>

      <div className="flex items-center gap-4">
        <div className="text-white">Username</div>
        <button
          type="button"
          onClick={handleLogout}
          className="w-24 bg-black rounded-full text-white p-4 hover:opacity-70 transition disabled:opacity-50 border border-white"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
