import { useModal } from '@/app/_providers/ModalProvider'
import { useAuthStore } from '@/stores/auth.store'
import { useRouter } from 'next/navigation'

export const useCheckLogin = () => {
  const { session } = useAuthStore()
  const router = useRouter()
  const { confirm } = useModal()

  const checkLogin = async (message?: string): Promise<boolean> => {
    if (!session) {
      const isConfirmed = await confirm({
        title: '로그인 필요',
        message:
          message ?? '로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?',
      })
      if (isConfirmed) {
        router.push('/sign-in')
      }
      return false
    }
    return true
  }

  return { checkLogin, isLoggedIn: !!session }
}
