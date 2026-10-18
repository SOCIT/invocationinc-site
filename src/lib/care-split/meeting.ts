import { CLAIMS } from "./claims";
import { findParagraph, hardMomentScripts, type HardMomentScript, type ModuleId } from "./sections";

export type { ModuleId };

export const MEETING_AGENDA = [
  "Read what each person reported on the approved Split Sheet.",
  "Go through the proposed responsibilities: who might do which tasks, who might pay, and who might be the backup.",
  "Check the respite line and the suggested check-ins.",
  "If you chose a module — the refusal, the money ask, or the break — read it aloud.",
];

export function meetingGroundRules(): string[] {
  return [
    findParagraph("WHEN records what each person reports."),
    CLAIMS.commitments[0],
    findParagraph(
      "WHEN provides education and meeting-preparation tools. It does not provide therapy",
    ),
  ];
}

const MODULE_ORDER: ModuleId[] = ["refusal", "money_ask", "break"];

export function buildReadAloud(input: {
  approved: boolean;
  inserted: Partial<Record<ModuleId, boolean>>;
  scripts?: readonly HardMomentScript[];
}):
  | { approved: false }
  | {
      approved: true;
      agenda: string[];
      groundRules: string[];
      modules: HardMomentScript[];
    } {
  if (!input.approved) return { approved: false };
  const scripts = input.scripts ?? hardMomentScripts();
  const modules = MODULE_ORDER.filter((id) => input.inserted[id]).flatMap((id) => {
    const script = scripts.find((item) => item.id === id);
    return script ? [script] : [];
  });
  return {
    approved: true,
    agenda: MEETING_AGENDA,
    groundRules: meetingGroundRules(),
    modules,
  };
}
