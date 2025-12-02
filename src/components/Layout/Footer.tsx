'use client'

import { snackBar } from '@/app/_providers/SnackBarProvider'
import { Footer, FooterCopyright, FooterIcon } from 'flowbite-react'

import { BsInstagram, BsGithub, BsEnvelope } from 'react-icons/bs'

export default function AppFooter() {
  const NAVER_EMAIL = 'aqw20501@naver.com'

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(NAVER_EMAIL)
      snackBar.showSuccess('이메일 복사 완료:', NAVER_EMAIL)
    } catch (err) {
      if (err instanceof Error) {
        snackBar.showError('이메일 복사 실패:', err.message)
      } else {
        snackBar.showError('이메일 복사 실패:', '알 수 없는 오류 발생')
      }
    }
  }

  return (
    <Footer container className="!bg-zinc-900 !opacity-95">
      <section className="w-full text-center sm:flex sm:items-center sm:justify-between">
        <FooterCopyright href="/" by="다락바™" year={2025} />
        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
          <FooterIcon
            href="https://www.instagram.com/bbbb_mo__/#"
            icon={BsInstagram}
          />
          <FooterIcon href="https://github.com/bbbbmo" icon={BsGithub} />
          <button
            onClick={copyToClipboard}
            className="text-gray-500"
            aria-label="이메일 복사"
          >
            <BsEnvelope className="h-5 w-5" />
          </button>
        </div>
      </section>
    </Footer>
  )
}
