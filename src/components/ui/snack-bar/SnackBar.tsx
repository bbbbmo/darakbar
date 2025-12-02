import { Alert } from 'flowbite-react'
import { HiInformationCircle } from 'react-icons/hi'
import { AppSnackBarColor } from './SnackBar.types'
import { useEffect, useState } from 'react'

export type AppSnackBarProps = {
  color?: AppSnackBarColor
  subject: string
  message: string
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
  position?: 'top' | 'bottom'
  /** 자동 닫기 여부 (기본값: true) */
  autoHide?: boolean
  /** 자동 닫기까지 대기 시간(ms, 기본값: 3000) */
  duration?: number
  /** 외부에서 열림 상태를 제어하고 싶을 때 사용(없으면 내부 상태 사용) */
  open?: boolean
  /** 닫힐 때 콜백 */
  onClose?: () => void
  /** 호버 중에는 타이머 일시정지 (기본값: true) */
  pauseOnHover?: boolean
}

export default function AppSnackBar({
  color = AppSnackBarColor.INFO,
  subject,
  message,
  icon = HiInformationCircle,
  position = 'bottom',
  autoHide = true,
  duration = 3000,
  open: openProp,
  onClose,
  pauseOnHover = true,
}: AppSnackBarProps) {
  const positionClasses = {
    top: 'top-4 left-1/2 -translate-x-1/2',
    bottom: 'bottom-4 left-1/2 -translate-x-1/2',
  }

  // 내부/외부 제어 둘 다 지원
  const [open, setOpen] = useState(openProp ?? true)
  const [hover, setHover] = useState(false)

  // 외부 openProp이 주어지면 동기화
  useEffect(() => {
    if (openProp !== undefined) setOpen(openProp)
  }, [openProp])

  // 자동 닫기 타이머
  useEffect(() => {
    if (!autoHide || !open) return
    if (pauseOnHover && hover) return

    const id = window.setTimeout(() => {
      // 외부 제어가 아니면 내부 상태로 닫기
      if (openProp === undefined) setOpen(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(id)
  }, [autoHide, duration, open, hover, pauseOnHover, openProp, onClose])

  if (!open) return null

  return (
    <Alert
      color={color}
      icon={icon}
      // 공백 추가! `fixed z-50 ${...}`
      className={`fixed z-99 ${positionClasses[position]} transform transition-opacity duration-300`}
      onDismiss={() => {
        if (openProp === undefined) setOpen(false)
        onClose?.()
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="font-medium">{subject}</span> {message}
    </Alert>
  )
}
