// src/components/Providers/SnackBarProvider.tsx
'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { AppSnackBarColor } from '@/components/SnackBar/SnackBar.types'
import SnackBarHost from '@/components/SnackBar/SnackBarHost'
import AppSnackBar from '@/components/SnackBar/SnackBar'

export type SnackBarEntry = {
  id: string
  color?: AppSnackBarColor
  subject: string
  message: string
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
  position?: 'top' | 'bottom'
  autoHide?: boolean
  duration?: number
  pauseOnHover?: boolean
}

export type SnackBarContextType = {
  snackBars: SnackBarEntry[]
  show: (props: Omit<SnackBarEntry, 'id'>) => string
  showSuccess: (subject: string, message: string) => string
  showError: (subject: string, message: string) => string
  showWarning: (subject: string, message: string) => string
  showInfo: (subject: string, message: string) => string
  close: (id: string) => void
  closeAll: () => void
}

const SnackBarContext = createContext<SnackBarContextType | null>(null)

// 전역 SnackBar 인스턴스
let globalSnackBar: SnackBarContextType | null = null

export function SnackBarProvider({ children }: { children: ReactNode }) {
  const [snackBars, setSnackBars] = useState<SnackBarEntry[]>([])

  const show: SnackBarContextType['show'] = (props) => {
    const id = uuidv4()
    setSnackBars((prev) => [...prev, { id, ...props }])
    return id
  }

  const showSuccess: SnackBarContextType['showSuccess'] = (
    subject,
    message,
  ) => {
    return show({
      color: AppSnackBarColor.SUCCESS,
      subject,
      message,
      position: 'bottom',
    })
  }

  const showError: SnackBarContextType['showError'] = (subject, message) => {
    return show({
      color: AppSnackBarColor.FAILURE,
      subject,
      message,
      position: 'bottom',
    })
  }

  const showWarning: SnackBarContextType['showWarning'] = (
    subject,
    message,
  ) => {
    return show({
      color: AppSnackBarColor.WARNING,
      subject,
      message,
      position: 'bottom',
    })
  }

  const showInfo: SnackBarContextType['showInfo'] = (subject, message) => {
    return show({
      color: AppSnackBarColor.INFO,
      subject,
      message,
      position: 'bottom',
    })
  }

  const close: SnackBarContextType['close'] = (id) => {
    setSnackBars((prev) => prev.filter((s) => s.id !== id))
  }

  const closeAll: SnackBarContextType['closeAll'] = () => {
    setSnackBars([])
  }

  const contextValue: SnackBarContextType = {
    snackBars,
    show,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    close,
    closeAll,
  }

  // 전역 인스턴스 설정
  globalSnackBar = contextValue

  return (
    <SnackBarContext.Provider value={contextValue}>
      {children}
      <SnackBarHost>
        {snackBars.map((snackBar) => (
          <AppSnackBar
            key={snackBar.id}
            {...snackBar}
            onClose={() => close(snackBar.id)}
          />
        ))}
      </SnackBarHost>
    </SnackBarContext.Provider>
  )
}

export function useSnackBar() {
  const ctx = useContext(SnackBarContext)
  if (!ctx) throw new Error('SnackBarProvider로 감싸주세요.')
  return ctx
}

// 전역 함수들 - 어디서든 import해서 사용 가능
export const snackBar = {
  show: (props: Omit<SnackBarEntry, 'id'>) => {
    if (!globalSnackBar) {
      console.warn('SnackBarProvider가 초기화되지 않았습니다.')
      return ''
    }
    return globalSnackBar.show(props)
  },

  showSuccess: (subject: string, message: string) => {
    if (!globalSnackBar) {
      console.warn('SnackBarProvider가 초기화되지 않았습니다.')
      return ''
    }
    return globalSnackBar.showSuccess(subject, message)
  },

  showError: (subject: string, message: string) => {
    if (!globalSnackBar) {
      console.warn('SnackBarProvider가 초기화되지 않았습니다.')
      return ''
    }
    return globalSnackBar.showError(subject, message)
  },

  showWarning: (subject: string, message: string) => {
    if (!globalSnackBar) {
      console.warn('SnackBarProvider가 초기화되지 않았습니다.')
      return ''
    }
    return globalSnackBar.showWarning(subject, message)
  },

  showInfo: (subject: string, message: string) => {
    if (!globalSnackBar) {
      console.warn('SnackBarProvider가 초기화되지 않았습니다.')
      return ''
    }
    return globalSnackBar.showInfo(subject, message)
  },

  close: (id: string) => {
    if (!globalSnackBar) {
      console.warn('SnackBarProvider가 초기화되지 않았습니다.')
      return
    }
    globalSnackBar.close(id)
  },

  closeAll: () => {
    if (!globalSnackBar) {
      console.warn('SnackBarProvider가 초기화되지 않았습니다.')
      return
    }
    globalSnackBar.closeAll()
  },
}
