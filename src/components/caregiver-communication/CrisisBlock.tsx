import {
  CRISIS_CLOSING,
  CRISIS_HEADING,
  CRISIS_ITEMS,
  CRISIS_LEAD_REST,
  CRISIS_LEAD_STRONG,
} from "@/lib/caregiver-communication/crisis";

export function CrisisBlock() {
  return (
    <section
      className="cc-crisis"
      id="crisis-resources"
      data-crisis="true"
      aria-labelledby="crisis-heading"
    >
      <h2 id="crisis-heading">{CRISIS_HEADING}</h2>
      <p>
        <strong>{CRISIS_LEAD_STRONG}</strong> {CRISIS_LEAD_REST}
      </p>
      <ul>
        {CRISIS_ITEMS.map((item) => (
          <li key={item.label}>
            <strong>{item.label}</strong> {item.text}
          </li>
        ))}
      </ul>
      <p>{CRISIS_CLOSING}</p>
    </section>
  );
}
