"use client";

import axios from "axios";
import React, { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";

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

  const fetchSubNotes = async (id: string) => {
    if (!show) {
      const response = await axios.get("/api/topics?id=" + id);
      setSections(response.data);
      setShow(true);
    } else {
      setShow(false);
    }
  };

  return (
    <div className="mb-2">
      {/* Main Topic */}
      <div
        onClick={() => fetchSubNotes(id)}
        className="hover:bg-secondary flex cursor-pointer items-center gap-3 rounded-xl px-4 py-2 transition-all hover:text-white"
      >
        {show ? <FaAngleDown /> : <FaAngleRight />}
        <IoDocumentTextOutline className="text-lg" />
        <span className="text-sm font-medium select-none">{title}</span>
      </div>

      {/* Expanded Sections */}
      {show && (
        <div className="mt-2 ml-6 space-y-2 border-l border-gray-600 pl-4">
          {sections.length > 0 &&
            sections.map((section, i) => (
              <div key={i}>
                {/* Section Title (e.g., THEORY, PROBLEMS) */}
                <h3 className="mb-1 text-xs font-bold text-gray-400 uppercase">
                  {section.title == "Ungrouped" ? "" : section.title}
                </h3>

                {/* Subpages under this section */}
                {section.subpages.map((sub) => (
                  <div
                    key={sub.id}
                    className="hover:bg-secondary flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1 transition-all hover:text-white"
                  >
                    <IoDocumentTextOutline className="text-sm" />
                    <span className="text-sm select-none">{sub.title}</span>
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SingleMenu;
