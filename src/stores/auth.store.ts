// stores/authStore.ts
import { create } from 'zustand'
import type { Session, User } from '@supabase/supabase-js'

type AuthState = {
  userData: {
    id: string
    email: string
    name: string
    avatarUrl: string
  } | null
  session: Session | null
  isReady: boolean // 첫 로딩 완료 플래그
}

export type UserData = {
  id: string
  email: string
  name: string
  avatarUrl: string
}

type AuthActions = {
  setAuth: (payload: { user: User | null; session: Session | null }) => void
  setReady: (ready: boolean) => void
  reset: () => void // 로컬 상태만 초기화
}

export const useAuthStore = create<AuthState & AuthActions>()((set) => ({
  userData: null,
  session: null,
  isReady: false,
  setAuth: ({ user, session }) =>
    set({
      userData: user
        ? {
            id: user.id,
            email: user.email ?? '',
            name: user.user_metadata.name ?? '',
            avatarUrl: user.user_metadata.avatar_url ?? '',
          }
        : null,
      session,
    }),
  setReady: (ready) => set({ isReady: ready }),
  reset: () => set({ userData: null, session: null }),
}))
