import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuth } from "./useAuth"

export const useCheckAuth = () => {
  const {isAuth, setIsAuth} = useAuth()
  const router = useRouter()

  useEffect(()=> {
    if (!isAuth) router.push('/auth')
  }, [isAuth])
}