import { ACCOUNT_NUMBER_ERROR, looksLikeAccountNumber } from "./account-guard";
import { INTERVIEW_PACK_SIZE } from "./stripe-price";
import {
  type Answer,
  type Question,
  type Variant,
  answerableIds,
  canSkip,
  currentQuestion,
  relevantQuestions,
} from "./questions";

export type { Answer, Variant };

export type Interview = {
  id: string;
  variant: Variant;
  startedAt: string;
  updatedAt: string;
  status: "in_progress" | "complete";
  answers: Answer[];
};

export type LedgerEntry =
  | {
      id: string;
      at: string;
      delta: typeof INTERVIEW_PACK_SIZE;
      reason: "interview_pack";
      sessionId: string;
    }
  | {
      id: string;
      at: string;
      delta: -1;
      reason: "interview_start";
      interviewId: string;
    };

export type ReviewSession = {
  sessionId: string;
  at: string;
};

export type FamilyState = {
  version: 1;
  ledger: LedgerEntry[];
  reviewSessions: ReviewSession[];
  interviews: Interview[];
  approvedAt: string | null;
  approvedHash: string | null;
};

const EMPTY: FamilyState = {
  version: 1,
  ledger: [],
  reviewSessions: [],
  interviews: [],
  approvedAt: null,
  approvedHash: null,
};

export function emptyState(): FamilyState {
  return {
    version: 1,
    ledger: [],
    reviewSessions: [],
    interviews: [],
    approvedAt: null,
    approvedHash: null,
  };
}

export function creditsRemaining(state: FamilyState): number {
  return state.ledger.reduce((sum, entry) => sum + entry.delta, 0);
}

/** Free-core visits do not write the ledger. */
export function touchFreeCore(state: FamilyState): FamilyState {
  return state;
}

export function applyInterviewPack(
  state: FamilyState,
  sessionId: string,
  at: string,
): FamilyState {
  if (
    state.ledger.some(
      (entry) => entry.reason === "interview_pack" && entry.sessionId === sessionId,
    )
  ) {
    return state;
  }
  const entry: LedgerEntry = {
    id: `pack:${sessionId}`,
    at,
    delta: INTERVIEW_PACK_SIZE,
    reason: "interview_pack",
    sessionId,
  };
  return { ...state, ledger: [...state.ledger, entry] };
}

export function applyReviewPurchase(
  state: FamilyState,
  sessionId: string,
  at: string,
): FamilyState {
  if (state.reviewSessions.some((session) => session.sessionId === sessionId)) {
    return state;
  }
  return {
    ...state,
    reviewSessions: [...state.reviewSessions, { sessionId, at }],
  };
}

export function reportHash(interviews: readonly Interview[]): string {
  const payload = interviews.map((interview) => ({
    id: interview.id,
    variant: interview.variant,
    answers: interview.answers.map((answer) => ({
      questionId: answer.questionId,
      report: answer.report,
      skipped: answer.skipped,
    })),
  }));
  const serialized = JSON.stringify(payload);
  let hash = 5381;
  for (let i = 0; i < serialized.length; i += 1) {
    hash = (hash * 33) ^ serialized.charCodeAt(i);
  }
  return (hash >>> 0).toString(16);
}

export function isApproved(state: FamilyState): boolean {
  if (!state.approvedAt || !state.approvedHash) return false;
  return state.approvedHash === reportHash(state.interviews);
}

export function canApprove(state: FamilyState): boolean {
  return state.interviews.some((interview) =>
    interview.answers.some((answer) => !answer.skipped && answer.report.trim()),
  );
}

export function approveSheet(state: FamilyState, at: string): FamilyState {
  if (!canApprove(state)) return state;
  return {
    ...state,
    approvedAt: at,
    approvedHash: reportHash(state.interviews),
  };
}

function statusFor(variant: Variant, answers: readonly Answer[]): Interview["status"] {
  const questions = relevantQuestions(variant, answers);
  const have = new Set(answers.map((answer) => answer.questionId));
  return questions.every((question) => have.has(question.id)) ? "complete" : "in_progress";
}

function prune(variant: Variant, answers: Answer[]): Answer[] {
  const allowed = new Set(relevantQuestions(variant, answers).map((question) => question.id));
  return answers.filter((answer) => allowed.has(answer.questionId));
}

export function startInterview(
  state: FamilyState,
  variant: Variant,
  at: string,
  id: string,
):
  | { ok: true; state: FamilyState; interviewId: string }
  | { ok: false; reason: "no_credits" } {
  if (state.interviews.some((interview) => interview.id === id)) {
    return { ok: true, state, interviewId: id };
  }
  if (creditsRemaining(state) < 1) return { ok: false, reason: "no_credits" };
  const interview: Interview = {
    id,
    variant,
    startedAt: at,
    updatedAt: at,
    status: "in_progress",
    answers: [],
  };
  const entry: LedgerEntry = {
    id: `start:${id}`,
    at,
    delta: -1,
    reason: "interview_start",
    interviewId: id,
  };
  return {
    ok: true,
    interviewId: id,
    state: {
      ...state,
      interviews: [...state.interviews, interview],
      ledger: [...state.ledger, entry],
    },
  };
}

export function recordAnswer(
  state: FamilyState,
  interviewId: string,
  question: Question,
  report: string,
  skipped: boolean,
  at: string,
):
  | { ok: true; state: FamilyState }
  | { ok: false; reason: "missing" | "out_of_order" | "name_required" | "account_number"; error?: string } {
  const interview = state.interviews.find((item) => item.id === interviewId);
  if (!interview) return { ok: false, reason: "missing" };
  if (!answerableIds(interview.variant, interview.answers).includes(question.id)) {
    return { ok: false, reason: "out_of_order" };
  }
  if (question.id === "name" && (skipped || !report.trim())) {
    return { ok: false, reason: "name_required" };
  }
  if (!canSkip(question) && skipped) return { ok: false, reason: "name_required" };
  const cleaned = skipped ? "" : report.trim();
  if (!skipped && looksLikeAccountNumber(cleaned)) {
    return { ok: false, reason: "account_number", error: ACCOUNT_NUMBER_ERROR };
  }
  const nextAnswer: Answer = {
    questionId: question.id,
    prompt: question.prompt,
    report: cleaned,
    skipped,
    savedAt: at,
  };
  const replaced = interview.answers.filter((answer) => answer.questionId !== question.id);
  replaced.push(nextAnswer);
  const answers = prune(interview.variant, replaced);
  const nextInterview: Interview = {
    ...interview,
    answers,
    updatedAt: at,
    status: statusFor(interview.variant, answers),
  };
  return {
    ok: true,
    state: {
      ...state,
      interviews: state.interviews.map((item) =>
        item.id === interviewId ? nextInterview : item,
      ),
    },
  };
}

export function currentOf(interview: Interview): Question | null {
  return currentQuestion(interview.variant, interview.answers);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function sanitizeAnswer(value: unknown): Answer | null {
  if (!isRecord(value)) return null;
  if (typeof value.questionId !== "string" || typeof value.prompt !== "string") return null;
  const report = typeof value.report === "string" ? value.report : "";
  if (looksLikeAccountNumber(report)) return null;
  return {
    questionId: value.questionId,
    prompt: value.prompt,
    report,
    skipped: value.skipped === true,
    savedAt: typeof value.savedAt === "string" ? value.savedAt : "",
  };
}

export function sanitizeInterview(value: unknown): Interview | null {
  if (!isRecord(value)) return null;
  if (value.variant !== "sibling" && value.variant !== "parent") return null;
  if (typeof value.id !== "string" || !value.id) return null;
  const answers = Array.isArray(value.answers)
    ? value.answers.flatMap((item) => {
        const answer = sanitizeAnswer(item);
        return answer ? [answer] : [];
      })
    : [];
  const pruned = prune(value.variant, answers);
  return {
    id: value.id,
    variant: value.variant,
    startedAt: typeof value.startedAt === "string" ? value.startedAt : "",
    updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : "",
    status: statusFor(value.variant, pruned),
    answers: pruned,
  };
}

function sanitizeLedger(value: unknown): LedgerEntry | null {
  if (!isRecord(value)) return null;
  if (value.reason === "interview_pack" && value.delta === INTERVIEW_PACK_SIZE) {
    if (typeof value.sessionId !== "string" || typeof value.id !== "string") return null;
    return {
      id: value.id,
      at: typeof value.at === "string" ? value.at : "",
      delta: INTERVIEW_PACK_SIZE,
      reason: "interview_pack",
      sessionId: value.sessionId,
    };
  }
  if (value.reason === "interview_start" && value.delta === -1) {
    if (typeof value.interviewId !== "string" || typeof value.id !== "string") return null;
    return {
      id: value.id,
      at: typeof value.at === "string" ? value.at : "",
      delta: -1,
      reason: "interview_start",
      interviewId: value.interviewId,
    };
  }
  return null;
}

export function sanitizeState(value: unknown): FamilyState {
  if (!isRecord(value)) return emptyState();
  const ledger = Array.isArray(value.ledger)
    ? value.ledger.flatMap((item) => {
        const entry = sanitizeLedger(item);
        return entry ? [entry] : [];
      })
    : [];
  const reviewSessions = Array.isArray(value.reviewSessions)
    ? value.reviewSessions.flatMap((item) => {
        if (!isRecord(item) || typeof item.sessionId !== "string") return [];
        return [
          {
            sessionId: item.sessionId,
            at: typeof item.at === "string" ? item.at : "",
          },
        ];
      })
    : [];
  const interviews = Array.isArray(value.interviews)
    ? value.interviews.flatMap((item) => {
        const interview = sanitizeInterview(item);
        return interview ? [interview] : [];
      })
    : [];
  return {
    version: 1,
    ledger,
    reviewSessions,
    interviews,
    approvedAt: typeof value.approvedAt === "string" ? value.approvedAt : null,
    approvedHash: typeof value.approvedHash === "string" ? value.approvedHash : null,
  };
}

export function importInterview(
  state: FamilyState,
  value: unknown,
): { ok: true; state: FamilyState } | { ok: false; reason: "unreadable" | "not_started_here" } {
  const payload = isRecord(value) && isRecord(value.interview) ? value.interview : value;
  const interview = sanitizeInterview(payload);
  if (!interview) return { ok: false, reason: "unreadable" };
  const startedHere = state.ledger.some(
    (entry) => entry.reason === "interview_start" && entry.interviewId === interview.id,
  );
  if (!startedHere && !state.interviews.some((item) => item.id === interview.id)) {
    return { ok: false, reason: "not_started_here" };
  }
  const rest = state.interviews.filter((item) => item.id !== interview.id);
  return { ok: true, state: { ...state, interviews: [...rest, interview] } };
}

/** A sibling device can continue a file the organizer already started. No credits are added. */
export function openInterviewFile(
  state: FamilyState,
  value: unknown,
): { ok: true; state: FamilyState; interviewId: string } | { ok: false; reason: "unreadable" } {
  const payload = isRecord(value) && isRecord(value.interview) ? value.interview : value;
  const interview = sanitizeInterview(payload);
  if (!interview) return { ok: false, reason: "unreadable" };
  const rest = state.interviews.filter((item) => item.id !== interview.id);
  return {
    ok: true,
    interviewId: interview.id,
    state: { ...state, interviews: [...rest, interview] },
  };
}

export function interviewFile(interview: Interview) {
  return {
    kind: "care-split-interview" as const,
    version: 1 as const,
    interview: sanitizeInterview(interview),
  };
}

export const EMPTY_STATE: FamilyState = EMPTY;
