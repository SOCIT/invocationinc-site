import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { ACCOUNT_NUMBER_ERROR } from "./account-guard";
import { HUMAN_REVIEW_SCOPE } from "./claims";
import { buyerBlocks } from "./buyer-copy";
import { buildReadAloud } from "./meeting";
import { emptyChecks, toggleCheck } from "./only-child";
import { phraseQuestion } from "./phrasing";
import {
  BRANCH_QUESTIONS,
  PARENT_QUESTIONS,
  SIBLING_QUESTIONS,
  SIBLING_VECTORS,
  currentQuestion,
  relevantQuestions,
} from "./questions";
import { groupBuyerCopy, hardMomentScripts, SECTION_ORDER } from "./sections";
import { buildSheet } from "./sheet";
import {
  applyInterviewPack,
  applyReviewPurchase,
  approveSheet,
  creditsRemaining,
  emptyState,
  importInterview,
  isApproved,
  recordAnswer,
  sanitizeState,
  startInterview,
  touchFreeCore,
  type Interview,
} from "./state";
import { validateCareSplitPrice } from "./stripe-price";
import { buildWorksheetDocument } from "./worksheet-doc";

const root = new URL(".", import.meta.url);

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else if (/\.(ts|tsx|txt|css)$/.test(name) && !name.endsWith(".test.mts")) out.push(path);
  }
  return out;
}

test("page sections stay in the locked order", () => {
  assert.deepEqual(
    groupBuyerCopy().map((section) => section.id),
    [...SECTION_ORDER],
  );
});

test("buyer copy matches the shipped text file", () => {
  const file = readFileSync(new URL("./buyer-copy.txt", root), "utf8");
  const lines: string[] = [];
  for (const block of buyerBlocks) {
    if (block.kind === "h1" || block.kind === "h3") lines.push(`**${block.text}**`);
    else if (block.kind === "h2" && block.text.startsWith("Part ")) lines.push(`## ${block.text}`);
    else if (block.kind === "h2") lines.push(`### ${block.text}`);
    else if (block.kind === "li") lines.push(`• ${block.text}`);
    else if (block.kind === "check") lines.push(`☐ ${block.text}`);
    else lines.push(block.text);
  }
  const fromFile = file
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  assert.deepEqual(lines, fromFile);
  assert.equal(file.includes(HUMAN_REVIEW_SCOPE), true);
  assert.equal(file.includes("[" + "Scope of human review"), false);
});

test("banned strings are absent from shipped care-split copy", () => {
  const banned = [
    ["Medicaid", "ready"].join("-"),
    ["conflict", "neutralized"].join("-"),
    ["man" + "datory", "res" + "pite"].join(" "),
    ["replacement", "cost"].join("-"),
    ["replacement", "cost"].join(" "),
  ];
  const words = ["man" + "datory", "bi" + "nd", "bo" + "und"];
  const files = [
    ...walk(new URL("../../components/care-split", root).pathname),
    ...walk(new URL("../../app/care-split", root).pathname),
    ...walk(new URL("../../app/api/care-split", root).pathname),
    ...walk(root.pathname),
  ].filter((file) => !file.endsWith(".css"));
  const corpus = files.map((file) => readFileSync(file, "utf8")).join("\n");
  for (const phrase of banned) {
    assert.equal(corpus.includes(phrase), false, phrase);
  }
  for (const word of words) {
    const re = new RegExp(`\\b${word}\\b`, "i");
    assert.equal(re.test(corpus), false, word);
  }
  assert.equal(/\d+(?:\.\d+)?\s*%/.test(corpus), false);
  assert.equal(new RegExp(`\\b${"calcul" + "ator"}\\b`, "i").test(corpus), false);
});

test("sibling interview order is fixed and branches only on the five triggers", () => {
  const vectors = SIBLING_QUESTIONS.map((question) => question.vector);
  const collapsed = vectors.filter((vector, index) => vector !== vectors[index - 1]);
  assert.deepEqual(collapsed, [...SIBLING_VECTORS]);
  assert.equal(PARENT_QUESTIONS.length, 8);
  assert.deepEqual(
    Object.keys(BRANCH_QUESTIONS).sort(),
    ["home_change_hearsay", "money_words", "notice", "poa", "respite_length"].sort(),
  );

  const plain = ["Alex", "Sibling of Dad", "Tuesday mornings", "Rides, two hours", "None", "Nearby", "Rides", "Overnights", "None", "Pat on Saturday", "No", "No"];
  let answers: Interview["answers"] = [];
  SIBLING_QUESTIONS.forEach((question, index) => {
    const current = currentQuestion("sibling", answers);
    assert.equal(current?.id, question.id);
    answers = [
      ...answers,
      {
        questionId: question.id,
        prompt: question.prompt,
        report: plain[index],
        skipped: false,
        savedAt: "t",
      },
    ];
  });
  assert.deepEqual(
    relevantQuestions("sibling", answers).map((question) => question.id),
    SIBLING_QUESTIONS.map((question) => question.id),
  );

  const money = answers.map((answer) =>
    answer.questionId === "money" ? { ...answer, report: "I can pay $40 a month" } : answer,
  );
  assert.equal(
    relevantQuestions("sibling", money).some((question) => question.branch === "money_words"),
    true,
  );

  const tired = answers.map((answer) =>
    answer.questionId === "limits" ? { ...answer, report: "I am tired of being the only one" } : answer,
  );
  assert.deepEqual(
    relevantQuestions("sibling", tired).map((question) => question.id),
    SIBLING_QUESTIONS.map((question) => question.id),
  );
});

test("phrasing hook returns the fixed prompt", async () => {
  const prompt = SIBLING_QUESTIONS[0].prompt;
  assert.equal(await phraseQuestion({ questionId: "name", canonicalPrompt: prompt }), prompt);
});

function answeredSibling(reports: Record<string, string>): Interview {
  let state = applyInterviewPack(emptyState(), "sess_test", "t0");
  const started = startInterview(state, "sibling", "t1", "iv_1");
  assert.equal(started.ok, true);
  if (!started.ok) throw new Error("start");
  state = started.state;
  const sequence = relevantQuestions("sibling", []);
  for (const question of sequence) {
    const report = reports[question.id] ?? "Noted";
    const saved = recordAnswer(state, "iv_1", question, report, false, "t2");
    assert.equal(saved.ok, true, question.id);
    if (!saved.ok) throw new Error(question.id);
    state = saved.state;
    const interview = state.interviews[0];
    const extra = relevantQuestions(interview.variant, interview.answers).filter(
      (item) => !interview.answers.some((answer) => answer.questionId === item.id),
    );
    for (const branch of extra) {
      if (reports[branch.id] === undefined && branch.branch === null) break;
      const branchReport = reports[branch.id] ?? "Noted";
      const branchSaved = recordAnswer(state, "iv_1", branch, branchReport, false, "t3");
      if (!branchSaved.ok) break;
      state = branchSaved.state;
    }
  }
  return state.interviews[0];
}

test("POA red-flag test case fires, and nearby negatives do not", () => {
  const flagged = answeredSibling({
    name: "Alex",
    who: "Sibling, for Dad",
    schedule: "Weekday evenings and one weekend morning, nearby",
    tasks_hours: "Medication pickup, 3 hours. Meals, 4 hours.",
    money: "None",
    distance: "Nearby, ten minutes away",
    skills: "Comfortable with hands-on care and meals",
    limits: "Overnights",
    respite: "One weekend a month",
    branch_respite_length: "One weekend a month",
    backup: "Pat, a Saturday, call Pat",
    capacity: "Yes. The parent's capacity has been questioned.",
    branch_notice: "I noticed Dad could not explain his bills.",
    poa: "The paid caregiver is also the sole financial POA agent.",
    branch_poa: "The paid caregiver is also the sole financial POA agent.",
  });
  const sheet = buildSheet([flagged]);
  assert.equal(sheet.poaRedFlag, true);
  assert.equal(sheet.poaRedFlagText, null);
  assert.match(sheet.respiteLine, /One weekend a month/);
  assert.match(sheet.suggestedCheckIns, /30 days/);
  assert.match(sheet.suggestedCheckIns, /60 days/);
  assert.match(sheet.suggestedCheckIns, /90 days/);
  assert.match(sheet.suggestedCheckIns, /fall/);
  assert.equal(sheet.rows[0].reportedTasksAndHours.includes("3 hours"), true);
  assert.equal(sheet.rows[0].whoMightDo.includes("Alex"), true);
  assert.equal(sheet.rows[0].whoMightPay, "Not reported");
  assert.equal(sheet.rows[0].whoMightBeBackup.includes("Pat"), true);
  const labels = sheet.labels[0].labels;
  assert.equal(labels.includes("hands-on lead"), true);
  assert.equal(labels.includes("respite/transport lead"), true);
  assert.equal(JSON.stringify(sheet).includes('"score"'), false);

  const noCapacity = answeredSibling({
    capacity: "No.",
    poa: "The paid caregiver is also the sole financial POA agent.",
    branch_poa: "The paid caregiver is also the sole financial POA agent.",
  });
  assert.equal(buildSheet([noCapacity]).poaRedFlag, false);

  const differentPeople = answeredSibling({
    capacity: "Yes. The parent's capacity has been questioned.",
    poa: "A sibling is the sole financial POA agent. A home aide is paid for care, and that aide is not the agent.",
    branch_poa: "A sibling is the sole financial agent. The aide is not the agent.",
  });
  assert.equal(buildSheet([differentPeople]).poaRedFlag, false);
});

test("pricing gates: free core, five-pack, decrement on start, review adds no interviews", () => {
  const start = emptyState();
  assert.equal(creditsRemaining(touchFreeCore(start)), 0);
  assert.equal(creditsRemaining(toggleCheck(emptyChecks(), 3) && start), 0);
  const packed = applyInterviewPack(start, "sess_1", "t");
  assert.equal(creditsRemaining(packed), 5);
  assert.equal(creditsRemaining(applyInterviewPack(packed, "sess_1", "t2")), 5);
  const first = startInterview(packed, "sibling", "t3", "a");
  assert.equal(first.ok, true);
  if (!first.ok) return;
  assert.equal(creditsRemaining(first.state), 4);
  const again = startInterview(first.state, "parent", "t4", "a");
  assert.equal(again.ok, true);
  if (!again.ok) return;
  assert.equal(creditsRemaining(again.state), 4);
  const second = startInterview(again.state, "parent", "t5", "b");
  assert.equal(second.ok, true);
  if (!second.ok) return;
  assert.equal(creditsRemaining(second.state), 3);
  let drained = second.state;
  for (const id of ["c", "d", "e"]) {
    const next = startInterview(drained, "sibling", "t6", id);
    assert.equal(next.ok, true);
    if (!next.ok) return;
    drained = next.state;
  }
  assert.equal(creditsRemaining(drained), 0);
  const blocked = startInterview(drained, "sibling", "t7", "f");
  assert.deepEqual(blocked, { ok: false, reason: "no_credits" });
  assert.equal(drained.interviews.some((interview) => interview.id === "f"), false);
  const reviewed = applyReviewPurchase(drained, "rev_1", "t8");
  assert.equal(creditsRemaining(reviewed), 0);
  assert.equal(reviewed.reviewSessions.length, 1);
  assert.equal(JSON.stringify(reviewed.ledger).includes("expir"), false);
});

test("records have no score field, and account numbers are not stored", () => {
  let state = applyInterviewPack(emptyState(), "sess", "t");
  const started = startInterview(state, "sibling", "t", "iv");
  assert.equal(started.ok, true);
  if (!started.ok) return;
  state = started.state;
  const name = SIBLING_QUESTIONS[0];
  const saved = recordAnswer(state, "iv", name, "Alex", false, "t");
  assert.equal(saved.ok, true);
  if (!saved.ok) return;
  const rejected = recordAnswer(
    saved.state,
    "iv",
    SIBLING_QUESTIONS[1],
    "account number 123456789012",
    false,
    "t",
  );
  assert.equal(rejected.ok, false);
  if (rejected.ok) return;
  assert.equal(rejected.reason, "account_number");
  assert.equal(rejected.error, ACCOUNT_NUMBER_ERROR);
  const json = JSON.stringify(saved.state);
  assert.equal(json.includes('"score"'), false);
  const poisoned = sanitizeState({
    ...saved.state,
    interviews: [{ ...saved.state.interviews[0], score: 9 }],
  });
  assert.equal(JSON.stringify(poisoned).includes("score"), false);
});

test("approval gates the read-aloud page, which has three modules and no resolution", () => {
  let state = applyInterviewPack(emptyState(), "sess", "t");
  const started = startInterview(state, "sibling", "t", "iv");
  assert.equal(started.ok, true);
  if (!started.ok) return;
  state = started.state;
  const saved = recordAnswer(state, "iv", SIBLING_QUESTIONS[0], "Alex", false, "t");
  assert.equal(saved.ok, true);
  if (!saved.ok) return;
  state = saved.state;
  assert.equal(isApproved(state), false);
  assert.deepEqual(buildReadAloud({ approved: false, inserted: { refusal: true, money_ask: true, break: true } }), {
    approved: false,
  });
  state = approveSheet(state, "t2");
  assert.equal(isApproved(state), true);
  const page = buildReadAloud({
    approved: true,
    inserted: { refusal: true, money_ask: false, break: true },
  });
  assert.equal(page.approved, true);
  if (!page.approved) return;
  assert.deepEqual(
    page.modules.map((module) => module.id),
    ["refusal", "break"],
  );
  assert.equal(JSON.stringify(page).includes("resolution"), false);
  const edited = recordAnswer(state, "iv", SIBLING_QUESTIONS[0], "Alexis", false, "t3");
  assert.equal(edited.ok, true);
  if (!edited.ok) return;
  assert.equal(isApproved(edited.state), false);
  const scripts = hardMomentScripts();
  assert.equal(scripts.length, 3);
  assert.equal(new Set(scripts.map((script) => script.id)).size, 3);
});

test("no attorney notice on any worksheet surface (2026-10-18 disclaimer purge)", () => {
  const sheet = buildSheet([]);
  for (const surface of ["cover", "preview", "download", "packet"] as const) {
    const text = buildWorksheetDocument({ surface, sheet, approved: false });
    assert.equal(/ATTORNEY REVIEW|elder-law attorney/i.test(text), false, surface);
  }
});

test("stripe price checks match the locked amounts and reject recurring prices", () => {
  assert.deepEqual(
    validateCareSplitPrice("interviews", { unit_amount: 2499, currency: "usd", recurring: null }),
    { ok: true },
  );
  assert.equal(
    validateCareSplitPrice("interviews", { unit_amount: 999, currency: "usd", recurring: null }).ok,
    false,
  );
  assert.equal(
    validateCareSplitPrice("review", { unit_amount: 10000, currency: "usd", recurring: null }).ok,
    true,
  );
  assert.equal(
    validateCareSplitPrice("review", { unit_amount: 15000, currency: "usd", recurring: null }).ok,
    true,
  );
  assert.equal(
    validateCareSplitPrice("review", { unit_amount: 9900, currency: "usd", recurring: null }).ok,
    false,
  );
  assert.equal(
    validateCareSplitPrice("interviews", {
      unit_amount: 2499,
      currency: "usd",
      recurring: { interval: "month" },
    }).ok,
    false,
  );
});

test("an interview file from an unknown id does not grant credits or a record", () => {
  const state = applyInterviewPack(emptyState(), "sess", "t");
  const imported = importInterview(state, {
    kind: "care-split-interview",
    interview: {
      id: "forged",
      variant: "sibling",
      startedAt: "t",
      updatedAt: "t",
      status: "in_progress",
      answers: [],
      score: 10,
    },
  });
  assert.equal(imported.ok, false);
  assert.equal(creditsRemaining(state), 5);
});
