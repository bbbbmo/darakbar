import { Navbar, NavbarBrand } from "flowbite-react";

import UserProfile from "./components/UserProfile";
import NavMenu from "./components/NavMenu";

export default function AppNavBar() {
  return (
    <Navbar fluid className="!bg-zinc-900 !opacity-95">
      <NavbarBrand>
        <div className="flex items-center gap-2">
          <img src="/images/logo/logo-icon.png" alt="Logo" className="w-9" />
          <img src="images/logo/logo-text.png" className="w-20" />
        </div>
      </NavbarBrand>
      <div className="flex md:order-2">
        <UserProfile />
      </div>
      <NavMenu />
    </Navbar>
  );
}
