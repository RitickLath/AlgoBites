"use client";

import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { menuItems } from "../constant/menuItem";

const InnerSideBar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <aside className="bg-primary flex h-screen w-[60px] flex-col justify-between py-8 shadow-lg sm:w-[100px]">
      {/* Logo */}
      <div className="relative text-center text-lg font-extrabold tracking-wide text-white select-none sm:text-2xl">
        <h1>
          A<span className="text-shade1">|</span>01
        </h1>
      </div>

      {/* Navigation Items */}
      <nav className="mt-10 flex flex-1 flex-col items-center gap-6">
        {menuItems.map(({ name, icon: Icon, href }) => (
          <Link
            onClick={() => handleClick()}
            key={name}
            href={href}
            className={`group hover:bg-secondary flex h-14 w-14 cursor-pointer flex-col items-center justify-center rounded-xl transition-all sm:h-20 sm:w-20 ${
              pathname == href
                ? "text-shade1"
                : "text-gray-200 hover:text-white"
            }`}
          >
            <Icon className="mb-1 text-2xl sm:text-3xl" />
            <span className="group-hover:text-shade1 hidden text-sm font-medium sm:flex">
              {name}
            </span>
          </Link>
        ))}
      </nav>

      {/* Footer (Logout button) */}
      <div className="flex w-full flex-col items-center text-center">
        <SignOutButton>
          <Link
            href="/"
            className="group hover:text-shade1 flex h-20 w-20 cursor-pointer flex-col items-center justify-center text-gray-200 transition-all"
          >
            <FaArrowLeft className="mb-1 text-xl" />
            <span className="hidden text-sm font-medium sm:flex">Logout</span>
          </Link>
        </SignOutButton>
      </div>
    </aside>
  );
};

export default InnerSideBar;
