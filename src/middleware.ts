import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  const loginRequiredPaths = [
    '/bar-news/create',
    '/bar-news/[postId]/edit',
    '/edit-profile',
  ]

  const isProtectedPath = loginRequiredPaths.some((path) => {
    if (path.includes('[')) {
      const pattern = path.replace(/\[.*?\]/g, '[^/]+')
      const regex = new RegExp(`^${pattern.replace(/\//g, '\\/')}$`)
      return regex.test(request.nextUrl.pathname)
    }
    return request.nextUrl.pathname.startsWith(path)
  })

  if (isProtectedPath) {
    // Supabase 쿠키 확인
    const authToken = request.cookies.get('sb-btkztlafowtisbypxsre-auth-token')

    if (!authToken) {
      const signInUrl = new URL('/sign-in', request.url)
      signInUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(signInUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/bar-news/create', '/bar-news/:path*/edit', '/edit-profile'],
}
