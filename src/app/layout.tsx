import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/globals.css'
import { Providers } from './providers'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '다락바',
  description: '칵테일 레시피 공유 서비스',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Providers>
          <main className="min-h-screen w-full bg-zinc-900">{children}</main>
        </Providers>
        {/* 카카오 맵 SDK */}
        <Script
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false&libraries=services,clusterer,drawing`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
