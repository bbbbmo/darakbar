import { Navbar } from 'flowbite-react'

type NavigationBarProps = {
  children: React.ReactNode
}

export default function NavigationBar({ children }: NavigationBarProps) {
  return (
    <Navbar
      fluid
      className="sticky top-0 z-50 !bg-zinc-900/50 backdrop-blur-sm"
    >
      {children}
    </Navbar>
  )
}
