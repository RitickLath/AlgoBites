"use client";

import { use, useEffect, useState } from "react";
import axios from "axios";
import MarkdownWrapper from "@/app/component/MarkdownWrapper";

const DynamicNotes = ({ params }: { params: Promise<{ id: string }> }) => {
  const [markdown, setMarkdown] = useState("");
  const { id } = use(params);

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await axios.get("/api/notes?id=" + id);
      setMarkdown(res.data);
    };
    fetchNotes();
  }, [id]);

  return (
    <div className="h-[80dvh] overflow-y-scroll p-2">
      <MarkdownWrapper>{markdown}</MarkdownWrapper>
    </div>
  );
};

export default DynamicNotes;
