import { CRISIS_HEADING, CRISIS_ITEMS } from "@/lib/caregiver-communication/crisis";

export function CrisisBlock() {
  return (
    <section
      className="cc-crisis"
      id="crisis-resources"
      data-crisis="true"
      aria-labelledby="crisis-heading"
    >
      <h2 id="crisis-heading">{CRISIS_HEADING}</h2>
      <ul>
        {CRISIS_ITEMS.map((item) => (
          <li key={item.label}>
            <strong>{item.label}</strong> {item.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
