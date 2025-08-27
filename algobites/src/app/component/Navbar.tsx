"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const Navbar = ({ gap }: { gap: "small" | "medium" }) => {
  return (
    <nav
      className={`bg-primary my-2 flex items-center justify-between rounded-lg border-[1] border-gray-700 px-6 py-3 shadow-md sm:my-4 md:my-6 lg:my-8 ${
        gap == "medium"
          ? "mx-2 sm:mx-6 md:mx-12 lg:mx-32"
          : "mx-2 sm:mx-3 md:mx-6 lg:mx-12"
      }`}
    >
      {/* Brand */}
      <div className="from-shade1 to-shade2 bg-gradient-to-r bg-clip-text text-2xl font-bold tracking-wide text-transparent select-none">
        Algobites
      </div>

      {/* Right side: Auth buttons */}
      <div className="flex items-center gap-5">
        {/* If not logged in */}
        <SignedOut>
          <SignInButton>
            <button className="hover:bg-secondary cursor-pointer rounded-md px-4 py-2 text-white transition">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="hover:bg-secondary cursor-pointer rounded-md px-4 py-2 text-white transition">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        {/* If logged in */}
        <SignedIn>
          <SignOutButton>
            <button className="hover:bg-secondary cursor-pointer rounded-md px-4 py-2 text-white transition">
              Logout
            </button>
          </SignOutButton>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
