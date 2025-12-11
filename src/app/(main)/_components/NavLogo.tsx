'use client'

import { NavbarBrand } from 'flowbite-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function NavLogo() {
  const router = useRouter()

  const goHomePage = () => {
    router.push('/home')
  }

  return (
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
  )
}
