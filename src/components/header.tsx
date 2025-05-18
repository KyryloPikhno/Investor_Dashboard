import Button from "@/components/button"
import { ButtonVariant, PATH, TOKEN_KEY } from "@/constants/common"
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
        <Button variant={ButtonVariant.Outline} onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  )
}
