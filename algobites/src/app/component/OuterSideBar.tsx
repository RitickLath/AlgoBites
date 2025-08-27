"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoDocumentTextOutline } from "react-icons/io5";
import { dashboardMenu } from "../constant/dashboardMenu";
import { notesMenu } from "../constant/notesMenu";
import { practiceMenu } from "../constant/practiceMenu";

const OuterSideBar = ({ isOpen }: { isOpen: boolean }) => {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <aside className="bg-primary flex h-screen w-[200px] flex-col justify-between py-8 shadow-lg">
      {/* Dynamic Navigation Items */}
      <nav className="mt-10 flex flex-1 flex-col gap-3 px-4">
        <>
          {pathname.startsWith("/notes") &&
            notesMenu.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-4 py-2 transition-all ${
                  pathname === href
                    ? "bg-secondary text-shade1 font-semibold"
                    : "hover:bg-secondary text-gray-200 hover:text-white"
                }`}
              >
                <IoDocumentTextOutline className="text-lg" />
                <span className="text-sm">{name}</span>
              </Link>
            ))}
          {pathname.startsWith("/practice") &&
            practiceMenu.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-4 py-2 transition-all ${
                  pathname === href
                    ? "bg-secondary text-shade1 font-semibold"
                    : "hover:bg-secondary text-gray-200 hover:text-white"
                }`}
              >
                <IoDocumentTextOutline className="text-lg" />
                <span className="text-sm">{name}</span>
              </Link>
            ))}
          {pathname.startsWith("/dashboard") &&
            dashboardMenu.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-4 py-2 transition-all ${
                  pathname === href
                    ? "bg-secondary text-shade1 font-semibold"
                    : "hover:bg-secondary text-gray-200 hover:text-white"
                }`}
              >
                <IoDocumentTextOutline className="text-lg" />
                <span className="text-sm">{name}</span>
              </Link>
            ))}
        </>
      </nav>
    </aside>
  );
};

export default OuterSideBar;
