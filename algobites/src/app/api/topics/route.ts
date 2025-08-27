// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Client } from "@notionhq/client";
import { NextRequest } from "next/server";

const SECRET = process.env.NOTION_SECRET_KEY;

// Initialize Notion client
const notion = new Client({ auth: SECRET });

// Fetch top-level pages
const DSAMASTERY = async (dsaMastry: string) => {
  const blockId = dsaMastry || "131e57a2fb55806fb413f66583a96a53";
  const response = await notion.blocks.children.list({ block_id: blockId });

  const pages = response.results
    .filter((b) => b.type === "child_page")
    .map((b) => ({ id: b.id, title: b.child_page.title }));

  return pages;
};

// Fetch subpages under headings
const SUBPAGES = async (subPage?: string) => {
  const blockId = subPage || "131e57a2fb5580709f19c3922b5cc323";
  const response = await notion.blocks.children.list({
    block_id: blockId,
  });

  const ans: { title: string; subpages: { id: string; title: string }[] }[] =
    [];

  for (let i = 0; i < response.results.length; i++) {
    const block = response.results[i];

    if (block.type === "heading_2") {
      // collect heading text
      let heading = "";
      for (const ele of block.heading_2.rich_text) {
        heading += ele.plain_text;
      }

      ans.push({
        title: heading,
        subpages: [],
      });
    }

    if (block.type === "child_page") {
      if (ans.length === 0) {
        // if no heading exists yet, create a default bucket
        ans.push({
          title: "Ungrouped",
          subpages: [],
        });
      }

      ans[ans.length - 1].subpages.push({
        id: block.id,
        title: block.child_page.title,
      });
    }
  }

  // console.log(JSON.stringify(ans, null, 2));
  return ans;
};

// Single GET function
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (id) {
    // Fetch subpages
    const data = await SUBPAGES(id);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    // Fetch top-level topics
    const data = await DSAMASTERY("131e57a2fb55806fb413f66583a96a53");
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
