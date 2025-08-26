"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-3 shadow-md bg-[#1D1C20] rounded-lg border-[1] border-gray-700 sm:mx-6 md:mx-12 lg:mx-32 sm:my-4 md:my-6 lg:my-8">
      {/* Brand */}
      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#EA763F] to-[#4e2714] tracking-wide">
        Algobites
      </div>

      {/* Right side: Auth buttons */}
      <div className="flex items-center gap-5">
        {/* If not logged in */}
        <SignedOut>
          <SignInButton>
            <button className="px-4 py-2 cursor-pointer rounded-md text-white hover:bg-[#3c3a42] transition">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="px-4 py-2 cursor-pointer rounded-md text-white hover:bg-[#3c3a42] transition">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        {/* If logged in */}
        <SignedIn>
          <SignOutButton>
            <button className="px-4 py-2 cursor-pointer rounded-md text-white hover:bg-[#3c3a42] transition">
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

//  from-[#EA763F] to-[#482412]
