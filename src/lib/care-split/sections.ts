import { buyerBlocks, type CopyBlock } from "./buyer-copy";

export const SECTION_ORDER = [
  "hero",
  "problem",
  "steps",
  "approval",
  "pricing",
  "guardrails",
  "only-child",
  "scripts",
] as const;

export type SectionId = (typeof SECTION_ORDER)[number];

export type CopySection = {
  id: SectionId;
  blocks: CopyBlock[];
};

function sectionFor(block: CopyBlock, existing: CopySection[]): SectionId | null {
  if (block.kind === "h1") return "hero";
  if (block.kind !== "h2" && block.kind !== "h3") return null;
  const text = block.text;
  if (text === "Start with the free core" && !existing.some((section) => section.id === "problem")) {
    return "problem";
  }
  if (text === "How it works") return "steps";
  if (text.startsWith("What you approve")) return "approval";
  if (text === "Pricing") return "pricing";
  if (text.startsWith("What The Care Split is")) return "guardrails";
  if (text.includes("Only Child Test")) return "only-child";
  if (text.includes("Three Hard-Moment")) return "scripts";
  return null;
}

export function groupBuyerCopy(blocks: readonly CopyBlock[] = buyerBlocks): CopySection[] {
  const sections: CopySection[] = [];
  let current: CopySection | null = null;
  for (const block of blocks) {
    const id = sectionFor(block, sections);
    if (id) {
      current = { id, blocks: [] };
      sections.push(current);
    } else if (!current) {
      current = { id: "hero", blocks: [] };
      sections.push(current);
    }
    current.blocks.push(block);
  }
  return sections;
}

export function findParagraph(snippet: string, blocks: readonly CopyBlock[] = buyerBlocks): string {
  const found = blocks.find(
    (block) =>
      (block.kind === "p" || block.kind === "li" || block.kind === "h2" || block.kind === "h3") &&
      block.text.includes(snippet),
  );
  if (!found) throw new Error(`Missing copy: ${snippet}`);
  return found.text;
}

export type ModuleId = "refusal" | "money_ask" | "break";

export type HardMomentScript = {
  id: ModuleId;
  title: string;
  lines: string[];
};

export function hardMomentScripts(blocks: readonly CopyBlock[] = buyerBlocks): HardMomentScript[] {
  const specs = [
    { n: "1", id: "money_ask" },
    { n: "2", id: "refusal" },
    { n: "3", id: "break" },
  ] as const;
  const found: HardMomentScript[] = specs.map(({ n, id }) => {
    const start = blocks.findIndex(
      (block) =>
        (block.kind === "h2" || block.kind === "h3") && block.text.startsWith(`Script ${n}:`),
    );
    if (start < 0) throw new Error(`Missing script ${n}`);
    const lines: string[] = [];
    for (let i = start + 1; i < blocks.length; i += 1) {
      const block = blocks[i];
      if (
        (block.kind === "h2" || block.kind === "h3") &&
        block.text.startsWith("Script ")
      ) {
        break;
      }
      if (block.kind === "p") lines.push(block.text);
    }
    const title = blocks[start];
    if (title.kind !== "h2" && title.kind !== "h3") throw new Error(`Missing script ${n}`);
    return { id, title: title.text, lines };
  });
  const order: ModuleId[] = ["refusal", "money_ask", "break"];
  return order.map((id) => {
    const script = found.find((item) => item.id === id);
    if (!script) throw new Error(`Missing module ${id}`);
    return script;
  });
}
