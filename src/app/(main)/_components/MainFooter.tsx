'use client'

import { copyToClipboard } from '@/utils/copyToClipboard'
import { Footer, FooterCopyright, FooterIcon } from 'flowbite-react'

import { BsInstagram, BsGithub, BsEnvelope } from 'react-icons/bs'

export default function MainFooter() {
  const NAVER_EMAIL = 'aqw20501@naver.com'

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
            onClick={() => copyToClipboard(NAVER_EMAIL)}
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
