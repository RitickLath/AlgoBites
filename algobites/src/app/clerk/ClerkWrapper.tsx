"use client";

import { ClerkProvider } from "@clerk/nextjs";
import React, { ReactNode } from "react";

const ClerkWrapper = ({ children }: { children: ReactNode }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default ClerkWrapper;
