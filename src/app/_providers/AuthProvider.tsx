'use client'

import { useAuthStore } from '@stores/auth.store'
import supabase from '@lib/supabase/supabase'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import Loading from '@/app/loading'
import { redirect, usePathname } from 'next/navigation'
import { getUserAvatarUrl } from '@/api/user/userAvatar'

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const setAuth = useAuthStore((state) => state.setAuth)
  const setReady = useAuthStore((state) => state.setReady)
  const { session, isReady } = useAuthStore()
  const pathname = usePathname()
  const queryClient = useQueryClient()
  const isAuthPage =
    pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const { data } = await supabase.auth.getSession()

      if (mounted) {
        setAuth({
          user: data?.session?.user ?? null,
          session: data?.session ?? null,
        })
        setReady(true)
      }
    })()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      // 로그인/로그아웃 시 자동으로 감지

      setAuth({
        user: session?.user ?? null,
        session: session ?? null,
      })

      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.invalidateQueries({ queryKey: ['user-recipe'] })
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [setAuth, setReady, queryClient])

  if (!isReady) return <Loading />

  if (session === null && !isAuthPage) redirect('/sign-in')

  return <>{children}</>
}
