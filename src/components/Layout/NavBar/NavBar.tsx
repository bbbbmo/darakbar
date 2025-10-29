'use client'

import { Navbar, NavbarBrand } from 'flowbite-react'

import UserProfile from './components/UserProfile'
import NavMenu from './components/NavMenu'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function AppNavBar() {
  const router = useRouter()

  const goHomePage = () => {
    router.push('/home')
  }
  return (
    <Navbar fluid className="sticky top-0 z-50 !bg-zinc-900 !opacity-95">
      <NavbarBrand onClick={goHomePage} className="cursor-pointer">
        <section className="flex items-center gap-2">
          <Image
            src="/images/logo/logo-icon.png"
            alt="Logo"
            style={{ width: 'auto', height: 'auto' }}
            width={28}
            height={0}
            priority={false}
          />
          <Image
            src="/images/logo/logo-text.png"
            alt="Logo"
            style={{ width: 'auto', height: 'auto' }}
            width={64}
            height={0}
            priority={true}
          />
        </section>
      </NavbarBrand>

      <section className="flex md:order-2">
        <UserProfile />
      </section>
      <NavMenu />
    </Navbar>
  )
}
