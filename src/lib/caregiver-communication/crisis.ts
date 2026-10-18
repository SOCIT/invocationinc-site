/**
 * Crisis-resources block: heading + emergency numbers only.
 * The boundary/disclaimer sentences were struck by the owner's
 * 2026-10-18 disclaimer purge; the numbers are functional resources.
 */
export const CRISIS_HEADING = "Need immediate help?";

export const CRISIS_ITEMS = [
  {
    label: "Immediate danger:",
    text: "Call 911 in the United States, or your local emergency number.",
  },
  {
    label: "Suicide or mental health crisis in the United States:",
    text: "Call or text 988 to reach the 988 Suicide & Crisis Lifeline.",
  },
  {
    label: "Outside the United States:",
    text: "Contact your local emergency service or an appropriate crisis-support service in your country.",
  },
] as const;

/** Plain text of the block. */
export const CRISIS_PLAINTEXT = [
  CRISIS_HEADING,
  "",
  ...CRISIS_ITEMS.map((item) => `- ${item.label} ${item.text}`),
].join("\n");
