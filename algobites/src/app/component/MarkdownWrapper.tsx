"use client";

import MarkdownPreview from "@uiw/react-markdown-preview";

const MarkdownWrapper = ({ children }: { children: string }) => {
  return (
    <div className="markdown" style={{ backgroundColor: "transparent" }}>
      <MarkdownPreview
        className="list-inside [&>ol]:-ml-2 [&>ol]:list-decimal [&>ul]:list-disc"
        source={children}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-[#9BC09C] sm:text-3xl md:text-4xl">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold text-[#b36452] sm:text-2xl md:text-3xl">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-medium text-[#DCA06D] sm:text-xl md:text-2xl">
              {children}
            </h3>
          ),
        }}
        style={{
          backgroundColor: "transparent",
          fontSize: "16px",
          lineHeight: "1.6",
        }}
      />
    </div>
  );
};

export default MarkdownWrapper;
