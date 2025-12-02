// ModalContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ModalHost from '../../components/ui/modals/ModalHost'

export type ModalEntry = {
  id: string
  name: string
  props?: Record<string, any>
}

export type ModalContextType = {
  modalStack: ModalEntry[]
  open: (name: string, props?: Record<string, any>) => string
  openExclusive: (name: string, props?: Record<string, any>) => string
  close: (id: string) => void
  closeAll: () => void
  confirm: (props: Record<string, any>) => Promise<boolean>
}

const ModalContext = createContext<ModalContextType | null>(null)

export type ModalRegistry = Record<string, React.ComponentType<any>>

export function ModalProvider({
  children,
  registry,
}: {
  children: ReactNode
  registry: ModalRegistry
}) {
  const [modalStack, setModalStack] = useState<ModalEntry[]>([])

  const open: ModalContextType['open'] = (name, props) => {
    const id = uuidv4()
    setModalStack((prev) => [...prev, { id, name, props }])
    return id
  }

  const openExclusive: ModalContextType['openExclusive'] = (name, props) => {
    const id = uuidv4()
    setModalStack([{ id, name, props }])
    return id
  }

  const close: ModalContextType['close'] = (id) => {
    setModalStack((prev) => prev.filter((m) => m.id !== id))
  }

  const closeAll: ModalContextType['closeAll'] = () => {
    setModalStack([])
  }

  const confirm: ModalContextType['confirm'] = (props) =>
    new Promise<boolean>((resolve) => {
      const id = open('ConfirmModal', {
        ...props,
        onConfirm: () => {
          resolve(true)
          close(id)
        },
        onCancel: () => {
          resolve(false)
          close(id)
        },
      })
    })

  return (
    <ModalContext.Provider
      value={{ modalStack, open, openExclusive, close, closeAll, confirm }}
    >
      {children}
      <ModalHost>
        {/* 스택 렌더링 */}
        {modalStack.map(({ id, name, props }) => {
          const Comp = registry[name]
          if (!Comp) return null
          return <Comp key={id} {...props} onClose={() => close(id)} />
        })}
      </ModalHost>
    </ModalContext.Provider>
  )
}

export function useModal() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('ModalProvider로 감싸주세요.')
  return ctx
}
