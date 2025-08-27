"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import SingleMenu from "./SingleMenu";

interface Topic {
  id: string;
  title: string;
}

const OuterSideBar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  const [topicList, setTopicList] = useState<Topic[]>([]);

  const fetchNotes = async () => {
    const response = await axios.get("/api/topics");
    setTopicList(response.data);
  };

 

  useEffect(() => {
    fetchNotes();
  }, [pathname]);

  if (!isOpen) return null;

  if (!pathname.startsWith("/notes")) setIsOpen(false);

  return (
    <aside className="bg-primary flex h-screen overflow-y-scroll w-[250px] flex-col justify-between py-8 shadow-lg">
      <nav className="mt-10 flex flex-1 flex-col gap-3 px-4">
        {topicList.length > 0 &&
          topicList.map((ele) => (
            <>
              <SingleMenu id={ele.id} title={ele.title} />
            </>
          ))}
      </nav>
    </aside>
  );
};

export default OuterSideBar;
