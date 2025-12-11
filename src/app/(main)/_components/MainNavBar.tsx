import NavigationBar from '@/components/ui/layout/NavBar'
import NavLogo from './NavLogo'
import NavMenu from './NavMenu'
import UserProfile from './UserProfile'

export default function MainNavBar() {
  return (
    <NavigationBar>
      <NavLogo />
      <NavMenu />
      <UserProfile />
    </NavigationBar>
  )
}
