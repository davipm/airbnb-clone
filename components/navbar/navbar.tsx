import React from "react";

import Container from "@/components/container";
import Categories from "@/components/navbar/categories";
import Logo from "@/components/navbar/logo";
import Search from "@/components/navbar/search";
import UserMenu from "@/components/navbar/user-menu";

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white z-10 shadow-sm">
      <header className="py-4 border-b-[1px]">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-0 items-center">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </header>
      <Categories />
    </nav>
  );
}
