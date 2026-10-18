import {
  capacityIsQuestioned,
  hasMoneyWords,
  hasPoa,
  hasRespiteLength,
  mentionsHomeChange,
} from "./signals";

export type Variant = "sibling" | "parent";

export type BranchId =
  | "notice"
  | "money_words"
  | "home_change_hearsay"
  | "respite_length"
  | "poa";

export type Question = {
  id: string;
  prompt: string;
  vector:
    | "identity"
    | "hours"
    | "money"
    | "distance"
    | "skills"
    | "limits"
    | "respite"
    | "backup"
    | "day";
  vectorLabel: string;
  branch: BranchId | null;
};

export type Answer = {
  questionId: string;
  prompt: string;
  report: string;
  skipped: boolean;
  savedAt: string;
};

export const SIBLING_VECTORS = [
  "identity",
  "hours",
  "money",
  "distance",
  "skills",
  "limits",
  "respite",
  "backup",
] as const;

const identity = "Who you are";
const hours = "Hours and schedule";
const money = "Money";
const distance = "Distance and mobility";
const skills = "Skills and task affinity";
const limits = "Hard limits";
const respite = "Respite";
const backup = "Backup and authority";
const day = "What the day looks like";

export const SIBLING_QUESTIONS: Question[] = [
  {
    id: "name",
    prompt: "What is your name?",
    vector: "identity",
    vectorLabel: identity,
    branch: null,
  },
  {
    id: "who",
    prompt: "Who are you in this family, and whose care is this about?",
    vector: "identity",
    vectorLabel: identity,
    branch: null,
  },
  {
    id: "schedule",
    prompt:
      "Which days and hours are you available? Include weekdays, weekends, or both if that is what you report.",
    vector: "hours",
    vectorLabel: hours,
    branch: null,
  },
  {
    id: "tasks_hours",
    prompt:
      "Which care tasks are you already doing, and how many hours do you report for each? This records what you report.",
    vector: "hours",
    vectorLabel: hours,
    branch: null,
  },
  {
    id: "money",
    prompt:
      "What money, if any, do you report that you could put toward care costs? Name the amount and what it would cover. Do not enter account numbers, card numbers, or routing numbers.",
    vector: "money",
    vectorLabel: money,
    branch: null,
  },
  {
    id: "distance",
    prompt:
      "How far do you live from the person who needs care, and how do you get there? Say whether you are nearby or far away.",
    vector: "distance",
    vectorLabel: distance,
    branch: null,
  },
  {
    id: "skills",
    prompt:
      "Which tasks are you comfortable taking on, and which do you want to leave with someone else? You can mention hands-on care, rides, paperwork, insurance calls, or bills.",
    vector: "skills",
    vectorLabel: skills,
    branch: null,
  },
  {
    id: "limits",
    prompt: "What can you not take on?",
    vector: "limits",
    vectorLabel: limits,
    branch: null,
  },
  {
    id: "respite",
    prompt:
      "What breaks from caregiving do you need, if any? If you need one, say how long.",
    vector: "respite",
    vectorLabel: respite,
    branch: null,
  },
  {
    id: "backup",
    prompt:
      "If you were sick or away, who else could be named? Include a name, a window of time, and a way to reach them.",
    vector: "backup",
    vectorLabel: backup,
    branch: null,
  },
  {
    id: "capacity",
    prompt:
      "Has the parent's capacity to make decisions been questioned? Say what was noticed, or say no.",
    vector: "backup",
    vectorLabel: backup,
    branch: null,
  },
  {
    id: "poa",
    prompt:
      "Who, if anyone, holds power of attorney? Say whether that person is a financial agent, whether they are the only financial agent, and whether they are also paid for care. Do not enter account numbers.",
    vector: "backup",
    vectorLabel: backup,
    branch: null,
  },
];

export const BRANCH_QUESTIONS: Record<BranchId, Question> = {
  notice: {
    id: "branch_notice",
    prompt:
      "What was noticed about capacity, and who noticed it? This records the report only.",
    vector: "backup",
    vectorLabel: backup,
    branch: "notice",
  },
  money_words: {
    id: "branch_money_words",
    prompt:
      "You used money words. Restate the amount you report, what it would cover, and whether you are already paying it. Do not enter account numbers, card numbers, or routing numbers.",
    vector: "money",
    vectorLabel: money,
    branch: "money_words",
  },
  home_change_hearsay: {
    id: "branch_home_change",
    prompt:
      "You mentioned a possible change of home. Did you see it yourself, or did you hear it from someone else? What was said?",
    vector: "distance",
    vectorLabel: distance,
    branch: "home_change_hearsay",
  },
  respite_length: {
    id: "branch_respite_length",
    prompt: "How long a break do you need?",
    vector: "respite",
    vectorLabel: respite,
    branch: "respite_length",
  },
  poa: {
    id: "branch_poa",
    prompt:
      "You reported a power of attorney. Name the agent, say whether that person is the sole financial agent, and say whether that same person is paid for care.",
    vector: "backup",
    vectorLabel: backup,
    branch: "poa",
  },
};

export const PARENT_QUESTIONS: Question[] = [
  {
    id: "name",
    prompt: "What is your name?",
    vector: "day",
    vectorLabel: day,
    branch: null,
  },
  {
    id: "morning",
    prompt: "What does your morning look like, in your own words?",
    vector: "day",
    vectorLabel: day,
    branch: null,
  },
  {
    id: "midday",
    prompt: "What does the middle of your day look like?",
    vector: "day",
    vectorLabel: day,
    branch: null,
  },
  {
    id: "evening",
    prompt: "What does your evening look like?",
    vector: "day",
    vectorLabel: day,
    branch: null,
  },
  {
    id: "own",
    prompt: "What parts of the day do you handle yourself?",
    vector: "day",
    vectorLabel: day,
    branch: null,
  },
  {
    id: "help",
    prompt: "What parts of the day do you want help with?",
    vector: "day",
    vectorLabel: day,
    branch: null,
  },
  {
    id: "keep",
    prompt: "What do you want to keep doing yourself?",
    vector: "day",
    vectorLabel: day,
    branch: null,
  },
  {
    id: "else",
    prompt: "What else should the family know about your day?",
    vector: "day",
    vectorLabel: day,
    branch: null,
  },
];

const BRANCH_ORDER: BranchId[] = [
  "notice",
  "money_words",
  "home_change_hearsay",
  "respite_length",
  "poa",
];

function triggered(question: Question, answer: Answer): Question[] {
  if (answer.skipped || !answer.report.trim()) return [];
  const text = answer.report;
  const hits = new Set<BranchId>();
  if (question.id === "money" && hasMoneyWords(text)) hits.add("money_words");
  if (question.id === "respite" && hasRespiteLength(text)) hits.add("respite_length");
  if (question.id === "capacity" && capacityIsQuestioned(text)) hits.add("notice");
  if (question.id === "poa" && hasPoa(text)) hits.add("poa");
  if (question.branch !== "home_change_hearsay" && mentionsHomeChange(text)) {
    hits.add("home_change_hearsay");
  }
  return BRANCH_ORDER.filter((id) => hits.has(id)).map((id) => BRANCH_QUESTIONS[id]);
}

/** Fixed questions plus a branch only after the answer that triggers it. */
export function relevantQuestions(variant: Variant, answers: readonly Answer[]): Question[] {
  if (variant === "parent") return PARENT_QUESTIONS.slice();
  const byId = new Map(answers.map((a) => [a.questionId, a]));
  const out: Question[] = [];
  const seen = new Set<string>();
  const add = (q: Question) => {
    if (seen.has(q.id)) return;
    seen.add(q.id);
    out.push(q);
  };
  for (const q of SIBLING_QUESTIONS) {
    add(q);
    const answer = byId.get(q.id);
    if (!answer) continue;
    for (const branch of triggered(q, answer)) {
      add(branch);
      const branchAnswer = byId.get(branch.id);
      if (!branchAnswer) continue;
      for (const nested of triggered(branch, branchAnswer)) add(nested);
    }
  }
  return out;
}

export function currentQuestion(
  variant: Variant,
  answers: readonly Answer[],
): Question | null {
  const have = new Set(answers.map((a) => a.questionId));
  return relevantQuestions(variant, answers).find((q) => !have.has(q.id)) ?? null;
}

export function answerableIds(variant: Variant, answers: readonly Answer[]): string[] {
  const have = new Set(answers.map((a) => a.questionId));
  const ids = new Set<string>();
  let opened = false;
  for (const q of relevantQuestions(variant, answers)) {
    if (have.has(q.id)) ids.add(q.id);
    else if (!opened) {
      ids.add(q.id);
      opened = true;
    }
  }
  return [...ids];
}

export function canSkip(question: Question): boolean {
  return question.id !== "name";
}
