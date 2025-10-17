'use client'

import { createContext, useContext, ReactNode } from 'react'

type BarContextType = {
  barId: number
}

const BarContext = createContext<BarContextType | undefined>(undefined)

export const BarProvider = ({
  children,
  barId,
}: {
  children: ReactNode
  barId: number
}) => {
  return <BarContext.Provider value={{ barId }}>{children}</BarContext.Provider>
}

export const useBar = () => {
  const context = useContext(BarContext)
  if (context === undefined) {
    throw new Error('useBar must be used within a BarProvider')
  }
  return context
}
