import { Client } from "@notionhq/client";
import { NextRequest } from "next/server";

const SECRET = process.env.NOTION_SECRET_KEY as string;

// Initialize Notion client
const notion = new Client({ auth: SECRET });

// helper function: convert blocks -> markdown
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function blocksToMarkdown(blocks: any[]): string {
  let md = "";

  for (const block of blocks) {
    switch (block.type) {
      case "heading_1":
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        md += `# ${block.heading_1.rich_text.map((t: any) => t.plain_text).join(" ")}\n\n`;
        break;
      case "heading_2":
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        md += `## ${block.heading_2.rich_text.map((t: any) => t.plain_text).join(" ")}\n\n`;
        break;
      case "heading_3":
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        md += `### ${block.heading_3.rich_text.map((t: any) => t.plain_text).join(" ")}\n\n`;
        break;
      case "paragraph":
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        md += `${block.paragraph.rich_text.map((t: any) => t.plain_text).join("")}\n\n`;
        break;
      case "bulleted_list_item":
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        md += `- ${block.bulleted_list_item.rich_text.map((t: any) => t.plain_text).join("")}\n`;
        break;
      case "numbered_list_item":
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        md += `1. ${block.numbered_list_item.rich_text.map((t: any) => t.plain_text).join("")}\n`;
        break;
      case "code":
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        md += `\`\`\`${block.code.language}\n${block.code.rich_text.map((t: any) => t.plain_text).join("")}\n\`\`\`\n\n`;
        break;
      case "image": {
        const url = block.image.file?.url || block.image.external?.url;

        md += `![image](${url})\n\n`;
        break;
      }
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return blocksToMarkdown(response.results as any[]);
}

// API handler
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  const markdown = await CONTENTLOAD(id);

  return new Response(markdown, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
