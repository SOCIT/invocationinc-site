/**
 * Crisis-resources block, verbatim from issue #6.
 * Placement rules and the comment header are not part of the block.
 */
export const CRISIS_HEADING = "Need immediate help?";

export const CRISIS_LEAD_STRONG =
  "This lesson is educational, not emergency support.";

export const CRISIS_LEAD_REST =
  "Invocation Inc does not provide crisis intervention, medical care, or emergency monitoring through this product.";

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

export const CRISIS_CLOSING =
  "If you are concerned about a person's sudden change in behavior, immediate safety, or possible medical emergency, contact an appropriate healthcare professional or emergency service. Do not rely on this lesson to assess the cause or severity of the situation.";

/** Plain text of the block, used to diff a rendered lesson against the issue comment. */
export const CRISIS_PLAINTEXT = [
  CRISIS_HEADING,
  "",
  `${CRISIS_LEAD_STRONG} ${CRISIS_LEAD_REST}`,
  "",
  ...CRISIS_ITEMS.map((item) => `- ${item.label} ${item.text}`),
  "",
  CRISIS_CLOSING,
].join("\n");
