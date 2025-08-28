"use client";

import axios from "axios";
import React, { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaAngleDown, FaAngleRight, FaRegFolderOpen  } from "react-icons/fa6";
import Link from "next/link";

type SubPage = {
  id: string;
  title: string;
};

type Section = {
  title: string;
  subpages: SubPage[];
};

const SingleMenu = ({ id, title }: { id: string; title: string }) => {
  const [show, setShow] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>(
    {},
  );

  const fetchSubNotes = async (id: string) => {
    if (!show) {
      const response = await axios.get("/api/topics?id=" + id);
      setSections(response.data);
      setShow(true);
    } else {
      setShow(false);
      setSections([]);
    }
  };

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className={`mb-2 w-full`}>
      {/* Main Topic */}
      <div
        onClick={() => fetchSubNotes(id)}
        className="hover:bg-secondary flex cursor-pointer gap-3 rounded-xl px-4 py-2 transition-all hover:text-white"
      >
        {show ? (
          <FaAngleDown size={16} className="shrink-0 mt-1" />
        ) : (
          <FaAngleRight size={16} className="shrink-0 mt-1" />
        )}
        <FaRegFolderOpen className="h-5 w-5 shrink-0 mt-1" />
        <span className="text-sm font-medium select-none">{title}</span>
      </div>

      {/* Expanded Sections */}
      {show && (
        <div className="mt-2 space-y-2 pl-4">
          {Array.isArray(sections) &&
            sections.length > 0 &&
            sections.map((section, i) => (
              <div key={i}>
                {/* Section header */}
                <div
                  onClick={() => toggleSection(i)}
                  className="hover:bg-secondary flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:text-white"
                >
                  {section.title !== "Ungrouped" &&
                    (openSections[i] ? (
                      <FaAngleDown size={16} className="shrink-0 mt-1" />
                    ) : (
                      <FaAngleRight size={16} className="shrink-0 mt-1" />
                    ))}
                  <h3 className="text-shade1 text-sm font-bold uppercase">
                    {section.title === "Ungrouped" || "" ? "" : section.title}
                  </h3>
                </div>

                {/* Subpages (collapsible) */}
                {(openSections[i] || section.title === "Ungrouped") && (
                  <div className="my-1 space-y-1">
                    {section.subpages.map((sub) => (
                      <Link
                        href={`/notes/${sub.id}`}
                        key={sub.id}
                        className="hover:bg-secondary flex cursor-pointer gap-2 rounded-lg px-3 py-2 transition-all hover:text-white"
                      >
                        <IoDocumentTextOutline size={16} className="shrink-0 mt-1" />
                        <span className="text-sm font-medium select-none">
                          {sub.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SingleMenu;
