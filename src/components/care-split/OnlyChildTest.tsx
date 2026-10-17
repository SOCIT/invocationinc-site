"use client";

import { setOnlyChildCheck, useOnlyChildChecks } from "@/lib/care-split/storage";
import { CreditLine } from "./CreditLine";

export function OnlyChildTest({ items }: { items: readonly string[] }) {
  const checks = useOnlyChildChecks();
  return (
    <div className="cs-checks">
      <CreditLine />
      {items.map((item, index) => (
        <label key={item} className="cs-check">
          <input
            type="checkbox"
            checked={Boolean(checks[index])}
            onChange={() => setOnlyChildCheck(index)}
          />
          <span>{item}</span>
        </label>
      ))}
    </div>
  );
}
