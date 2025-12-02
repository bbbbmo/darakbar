import { snackBar } from '@/app/_providers/SnackBarProvider'

export const copyToClipboard = async (text: string, subject?: string) => {
  try {
    await navigator.clipboard.writeText(text)
    snackBar.showSuccess(`${subject || ''} 복사 완료:`, text)
  } catch (err) {
    if (err instanceof Error) {
      snackBar.showError(`${subject || ''} 복사 실패:`, err.message)
    } else {
      snackBar.showError(`${subject || ''} 복사 실패:`, '알 수 없는 오류 발생')
    }
  }
}
