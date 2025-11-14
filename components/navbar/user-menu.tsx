"use client";

import { signOut, useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import Avatar from "@/components/avatar";
import MenuItem from "@/components/navbar/menu-item";
import { useModalStore } from "@/store";

export default function UserMenu() {
  const { data, status } = useSession();
  const { openLogin, openRent, openRegister } = useModalStore();

  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  const onRent = useCallback(() => {
    if (status === "unauthenticated") return openLogin();
    return openRent();
  }, [openLogin, openRent, status]);

  const closeModalRef = useCallback((event: any) => {
    if (modalRef.current?.contains(event.target as Node)) return;
    setIsOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("click", closeModalRef);
    return () => {
      window.removeEventListener("click", closeModalRef);
    };
  }, [closeModalRef]);

  return (
    <nav className="relative w-max ml-auto" ref={modalRef}>
      <div className="flex items-center gap-3">
        <button
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </button>
        <button
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={data?.user.image} />
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vm] md:w-[230px] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {status === "authenticated" ? (
              <>
                <MenuItem label="My trips" url="/trips" />
                <MenuItem label="My favorites" url="/favorites" />
                <MenuItem label="My reservations" url="/reservations" />
                <MenuItem label="My properties" url="/properties" />
                <button
                  onClick={openRent}
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold text-left"
                >
                  Airbnb your home
                </button>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={openLogin}
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold text-left"
                >
                  Login
                </button>
                <button
                  onClick={openRegister}
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold text-left"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
