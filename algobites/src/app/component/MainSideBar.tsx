"use client";

import { useState } from "react";
import InnerSideBar from "./InnerSideBar";
import OuterSideBar from "./OuterSideBar";

const MainSideBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="flex">
      <InnerSideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <OuterSideBar isOpen={isOpen} />
    </div>
  );
};

export default MainSideBar;
