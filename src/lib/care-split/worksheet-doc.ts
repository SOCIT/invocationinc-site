import {
  ATTORNEY_NOTICE_BODY,
  ATTORNEY_NOTICE_TITLE,
  CLAIMS,
} from "./claims";
import type { SplitSheet } from "./sheet";

export type WorksheetSurface = "cover" | "preview" | "download" | "packet";

export function buildWorksheetDocument(input: {
  surface: WorksheetSurface;
  sheet: SplitSheet;
  approved: boolean;
}): string {
  const lines: string[] = [ATTORNEY_NOTICE_TITLE, ATTORNEY_NOTICE_BODY, ""];
  lines.push(...CLAIMS.pca);
  lines.push("");
  if (input.surface === "cover") {
    lines.push("Educational Personal Care Agreement preparation worksheet.");
    return lines.join("\n");
  }
  lines.push("Reported tasks and hours");
  if (input.sheet.rows.length === 0) lines.push("Not reported");
  for (const row of input.sheet.rows) {
    lines.push(`${row.person}: ${row.reportedTasksAndHours}`);
    lines.push(`Who might do this (proposed): ${row.whoMightDo}`);
    lines.push(`Who might pay (proposed): ${row.whoMightPay}`);
    lines.push(`Who might be the backup (proposed): ${row.whoMightBeBackup}`);
  }
  lines.push("");
  lines.push(`Respite line: ${input.sheet.respiteLine}`);
  lines.push(input.sheet.suggestedCheckIns);
  if (input.sheet.poaRedFlag && input.sheet.poaRedFlagText) {
    lines.push("");
    lines.push(input.sheet.poaRedFlagText);
  }
  lines.push("");
  lines.push(...CLAIMS.benefits);
  lines.push(...CLAIMS.tax);
  lines.push(...CLAIMS.limits);
  lines.push(...CLAIMS.commitments);
  if (input.surface === "packet") {
    lines.push("");
    lines.push(
      input.approved
        ? "The organizer approved this Split Sheet."
        : "Not approved to share. Nothing goes to your siblings until you approve it.",
    );
  }
  return lines.join("\n");
}
