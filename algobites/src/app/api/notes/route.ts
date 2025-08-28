// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Client } from "@notionhq/client";
import { NextRequest } from "next/server";

const SECRET = process.env.NOTION_SECRET_KEY;

// Initialize Notion client
const notion = new Client({ auth: SECRET });

// helper function: convert blocks -> markdown
function blocksToMarkdown(blocks): string {
  let md = "";

  for (const block of blocks) {
    switch (block.type) {
      case "heading_1":
        md += `# ${block.heading_1.rich_text.map((t) => t.plain_text).join(" ")}\n\n`;
        break;
      case "heading_2":
        md += `## ${block.heading_2.rich_text.map((t) => t.plain_text).join(" ")}\n\n`;
        break;
      case "heading_3":
        md += `### ${block.heading_3.rich_text.map((t) => t.plain_text).join(" ")}\n\n`;
        break;
      case "paragraph":
        md += `${block.paragraph.rich_text.map((t) => t.plain_text).join("")}\n\n`;
        break;
      case "bulleted_list_item":
        md += `- ${block.bulleted_list_item.rich_text.map((t) => t.plain_text).join("")}\n`;
        break;
      case "numbered_list_item":
        md += `1. ${block.numbered_list_item.rich_text.map((t) => t.plain_text).join("")}\n`;
        break;
      case "code":
        md += `\`\`\`${block.code.language}\n${block.code.rich_text.map((t) => t.plain_text).join("")}\n\`\`\`\n\n`;
        break;
      case "image":
        const url = block.image.file?.url || block.image.external?.url;
        md += `![image](${url})\n\n`;
        break;
      default:
        break;
    }
  }

  return md;
}

// fetch blocks from Notion
async function CONTENTLOAD(id?: string | null) {
  const blockId = id || "215e57a2fb5580b989a7de08c90466e3";
  const response = await notion.blocks.children.list({
    block_id: blockId,
  });
  return blocksToMarkdown(response.results);
}

// API handler
export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  const markdown = await CONTENTLOAD(id);

  return new Response(markdown, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
