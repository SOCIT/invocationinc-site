import type { ReactNode } from "react";
import type { CopyBlock } from "@/lib/care-split/buyer-copy";
import { groupBuyerCopy, type SectionId } from "@/lib/care-split/sections";
import { CareNav } from "./CareNav";
import { OnlyChildTest } from "./OnlyChildTest";
import { PricingPanel } from "./PricingPanel";

function renderBlocks(blocks: readonly CopyBlock[], sectionId: SectionId) {
  const nodes: ReactNode[] = [];
  let index = 0;
  let usedHeading = false;
  while (index < blocks.length) {
    const block = blocks[index];
    if (block.kind === "li") {
      const items: string[] = [];
      const start = index;
      while (index < blocks.length && blocks[index].kind === "li") {
        const item = blocks[index];
        if (item.kind === "li") items.push(item.text);
        index += 1;
      }
      nodes.push(
        <ul key={`${sectionId}-ul-${start}`}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>,
      );
      continue;
    }
    if (block.kind === "check") {
      const items: string[] = [];
      while (index < blocks.length && blocks[index].kind === "check") {
        const item = blocks[index];
        if (item.kind === "check") items.push(item.text);
        index += 1;
      }
      nodes.push(<OnlyChildTest key={`${sectionId}-checks`} items={items} />);
      continue;
    }
    const heading =
      !usedHeading && (block.kind === "h1" || block.kind === "h2" || block.kind === "h3");
    if (heading) usedHeading = true;
    const id = heading ? `${sectionId}-heading` : undefined;
    const quote = block.kind === "p" && block.text.startsWith("“");
    if (block.kind === "h1") {
      nodes.push(
        <h1 key={`${sectionId}-${index}`} id={id}>
          {block.text}
        </h1>,
      );
    } else if (block.kind === "h2") {
      nodes.push(
        <h2 key={`${sectionId}-${index}`} id={id}>
          {block.text}
        </h2>,
      );
    } else if (block.kind === "h3") {
      nodes.push(
        <h3 key={`${sectionId}-${index}`} id={id}>
          {block.text}
        </h3>,
      );
    } else {
      nodes.push(
        <p key={`${sectionId}-${index}`} className={quote ? "cs-quote" : undefined}>
          {block.text}
        </p>,
      );
    }
    index += 1;
  }
  return nodes;
}

export function BuyerCopyView() {
  const sections = groupBuyerCopy();
  return (
    <>
      <CareNav />
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={section.id === "hero" ? "cs-hero" : "cs-section"}
          aria-labelledby={`${section.id}-heading`}
        >
          <div className={section.id === "hero" ? "cs-hero-inner" : "cs-wrap"}>
            {renderBlocks(section.blocks, section.id)}
            {section.id === "pricing" ? <PricingPanel /> : null}
          </div>
        </section>
      ))}
    </>
  );
}
