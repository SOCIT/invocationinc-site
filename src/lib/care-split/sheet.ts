import { SUGGESTED_CHECK_INS } from "./claims";
import type { Interview } from "./state";
import {
  capacityIsQuestioned,
  handsOnComfort,
  hasAdminSkill,
  hasTime,
  hasWeekends,
  isDistant,
  isNearby,
  paidCaregiverIsSoleFinancialAgent,
  reportsIncome,
} from "./signals";

export type SheetRow = {
  person: string;
  reportedTasksAndHours: string;
  whoMightDo: string;
  whoMightPay: string;
  whoMightBeBackup: string;
};

export type ProposedLabel = {
  person: string;
  labels: string[];
  because: string[];
};

export type ParentDay = {
  name: string;
  lines: { prompt: string; report: string }[];
};

export type SplitSheet = {
  rows: SheetRow[];
  labels: ProposedLabel[];
  legend: { label: string; when: string }[];
  respiteLine: string;
  suggestedCheckIns: string;
  parentDays: ParentDay[];
  poaRedFlag: boolean;
  poaRedFlagText: string | null;
};

const LEGEND: { label: string; when: string }[] = [
  { label: "hands-on lead", when: "nearby + time + comfort with hands-on care" },
  { label: "remote-admin lead", when: "distant + admin skill" },
  { label: "respite/transport lead", when: "nearby + weekends" },
  { label: "financial contributor + scheduled relief", when: "distant + income" },
];

function reported(interview: Interview, questionId: string): string {
  const answer = interview.answers.find(
    (item) => item.questionId === questionId && !item.skipped,
  );
  return answer?.report.trim() ?? "";
}

function personName(interview: Interview): string {
  return reported(interview, "name") || "Name not reported";
}

export function poaRedFlag(interviews: readonly Interview[]): boolean {
  const capacity = interviews.some((interview) =>
    [reported(interview, "capacity"), reported(interview, "branch_notice")].some(
      (text) => text && capacityIsQuestioned(text),
    ),
  );
  const paidSole = interviews.some((interview) =>
    paidCaregiverIsSoleFinancialAgent(
      [reported(interview, "poa"), reported(interview, "branch_poa")]
        .filter(Boolean)
        .join("\n"),
    ),
  );
  return capacity && paidSole;
}

function labelsFor(interview: Interview): ProposedLabel {
  const distance = `${reported(interview, "distance")} ${reported(interview, "who")}`;
  const schedule = `${reported(interview, "schedule")} ${reported(interview, "tasks_hours")}`;
  const skills = reported(interview, "skills");
  const money = `${reported(interview, "money")} ${reported(interview, "branch_money_words")}`;
  const nearby = isNearby(distance) && !isDistant(distance);
  const distant = isDistant(distance);
  const labels: string[] = [];
  const because: string[] = [];
  if (nearby && hasTime(schedule) && handsOnComfort(skills)) {
    labels.push(LEGEND[0].label);
    because.push(LEGEND[0].when);
  }
  if (distant && hasAdminSkill(skills)) {
    labels.push(LEGEND[1].label);
    because.push(LEGEND[1].when);
  }
  if (nearby && hasWeekends(`${reported(interview, "schedule")} ${distance}`)) {
    labels.push(LEGEND[2].label);
    because.push(LEGEND[2].when);
  }
  if (distant && reportsIncome(money)) {
    labels.push(LEGEND[3].label);
    because.push(LEGEND[3].when);
  }
  return { person: personName(interview), labels, because };
}

export function buildSheet(interviews: readonly Interview[]): SplitSheet {
  const siblings = interviews.filter((interview) => interview.variant === "sibling");
  const parents = interviews.filter((interview) => interview.variant === "parent");
  const rows: SheetRow[] = siblings.map((interview) => {
    const name = personName(interview);
    const tasks = reported(interview, "tasks_hours");
    const money = `${reported(interview, "money")} ${reported(interview, "branch_money_words")}`.trim();
    const backup = reported(interview, "backup");
    return {
      person: name,
      reportedTasksAndHours: tasks || "Not reported",
      whoMightDo: tasks ? `${name} (proposed, from what they reported doing)` : "Not reported",
      whoMightPay: reportsIncome(money)
        ? `${name} (proposed, from what they reported)`
        : "Not reported",
      whoMightBeBackup: backup || "Not reported",
    };
  });
  const respiteParts = siblings.flatMap((interview) => {
    const name = personName(interview);
    const parts = [reported(interview, "respite"), reported(interview, "branch_respite_length")]
      .filter(Boolean)
      .map((text) => `${name}: ${text}`);
    return parts;
  });
  const flag = poaRedFlag(interviews);
  return {
    rows,
    labels: siblings.map(labelsFor),
    legend: LEGEND,
    respiteLine: respiteParts.length
      ? respiteParts.join(" ")
      : "No respite arrangement was reported.",
    suggestedCheckIns: SUGGESTED_CHECK_INS,
    parentDays: parents.map((interview) => ({
      name: personName(interview),
      lines: interview.answers
        .filter((answer) => !answer.skipped && answer.report.trim())
        .map((answer) => ({ prompt: answer.prompt, report: answer.report })),
    })),
    poaRedFlag: flag,
    poaRedFlagText: null,
  };
}
