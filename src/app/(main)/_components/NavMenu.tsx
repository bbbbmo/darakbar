'use client'

import { NavbarCollapse } from 'flowbite-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavMenu() {
  const pathname = usePathname()

  const navMenuList = [
    {
      text: 'Home',
      url: '/home',
    },
    {
      text: '바 탐색',
      url: '/bars',
    },
    {
      text: '바 소식',
      url: '/bar-news',
    },
  ]

  return (
    <NavbarCollapse>
      {navMenuList.map((menu, index) => {
        return (
          <Link
            key={index}
            href={menu.url}
            className={`${pathname === menu.url ? 'active' : ''}`}
          >
            {menu.text}
          </Link>
        )
      })}
    </NavbarCollapse>
  )
}
