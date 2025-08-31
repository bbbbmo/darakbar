import { Navbar, NavbarBrand } from "flowbite-react";

import UserProfile from "./components/UserProfile";
import NavMenu from "./components/NavMenu";
import Image from "next/image";

export default function AppNavBar() {
  return (
    <Navbar fluid className="!bg-zinc-900 !opacity-95">
      <NavbarBrand>
        <section className="flex items-center gap-2">
          <Image
            src="/images/logo/logo-icon.png"
            alt="Logo"
            className="h-auto w-9"
            width={36}
            height={36}
            priority={false}
          />
          <Image
            src="/images/logo/logo-text.png"
            alt="Logo"
            className="h-auto w-20"
            width={80}
            height={80}
            priority={true}
          />
        </section>
      </NavbarBrand>
      <section className="flex md:order-2">
        <UserProfile />
      </section>
      <NavMenu />
    </Navbar>
  );
}
