"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ACCOUNT_NUMBER_ERROR } from "@/lib/care-split/account-guard";
import { phraseQuestion } from "@/lib/care-split/phrasing";
import {
  canSkip,
  currentQuestion,
  relevantQuestions,
  type Question,
  type Variant,
} from "@/lib/care-split/questions";
import {
  creditsRemaining,
  interviewFile,
  openInterviewFile,
  recordAnswer,
  startInterview,
} from "@/lib/care-split/state";
import { getFamilySnapshot, updateFamily, useFamily } from "@/lib/care-split/storage";
import { CareNav } from "./CareNav";
import { CreditLine } from "./CreditLine";

const PRICE_LINES = [
  "WHEN's core offering is free.",
  "The AI interview tier costs $9.99 and includes five interviews.",
];

export function InterviewHome() {
  const router = useRouter();
  const state = useFamily();
  const credits = creditsRemaining(state);
  const lock = useRef(false);
  const [fileError, setFileError] = useState<string | null>(null);

  function start(variant: Variant) {
    if (lock.current) return;
    lock.current = true;
    const result = startInterview(
      getFamilySnapshot(),
      variant,
      new Date().toISOString(),
      crypto.randomUUID(),
    );
    if (!result.ok) {
      lock.current = false;
      return;
    }
    updateFamily(() => result.state);
    router.push(`/care-split/interview/${result.interviewId}`);
  }

  async function onFile(file: File | undefined) {
    if (!file) return;
    setFileError(null);
    try {
      const parsed = JSON.parse(await file.text()) as unknown;
      const opened = openInterviewFile(getFamilySnapshot(), parsed);
      if (!opened.ok) {
        setFileError("That file could not be read.");
        return;
      }
      updateFamily(() => opened.state);
      router.push(`/care-split/interview/${opened.interviewId}`);
    } catch {
      setFileError("That file could not be read.");
    }
  }

  return (
    <>
      <CareNav />
      <main className="cs-section">
        <div className="cs-wrap">
          <h1>Interview</h1>
          <CreditLine />
          <p>Starting an interview uses one interview. They do not expire. This is not a subscription.</p>
          <p>The free core does not use an interview.</p>
          {PRICE_LINES.map((line) => (
            <p key={line}>{line}</p>
          ))}
          {credits < 1 && (
            <p>
              You have no interviews remaining.{" "}
              <Link href="/care-split#pricing">See pricing</Link>
              {" · "}
              <Link href="/care-split#only-child">Only Child Test</Link>
            </p>
          )}
          <button
            type="button"
            className="cs-btn"
            disabled={credits < 1}
            onClick={() => start("sibling")}
          >
            Start a sibling interview
          </button>
          <button
            type="button"
            className="cs-btn cs-btn-secondary"
            disabled={credits < 1}
            onClick={() => start("parent")}
          >
            Start a parent interview
          </button>
          {state.interviews.length > 0 && (
            <>
              <h2>On this device</h2>
              <ul className="cs-interview-list">
                {state.interviews.map((interview) => (
                  <li key={interview.id}>
                    <Link href={`/care-split/interview/${interview.id}`}>
                      {interview.variant === "parent" ? "Parent" : "Sibling"} interview ·{" "}
                      {interview.status === "complete" ? "saved" : "in progress"}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <h2>Interview file</h2>
          <p>
            Interview answers stay on this device unless you save a file. The file is for your
            family. It is not uploaded. Opening a file does not add a pack of five interviews.
          </p>
          <label className="cs-file">
            Open an interview file
            <input
              type="file"
              accept="application/json,.json"
              onChange={(event) => {
                void onFile(event.target.files?.[0]);
                event.target.value = "";
              }}
            />
          </label>
          {fileError && <p className="cs-error">{fileError}</p>}
        </div>
      </main>
    </>
  );
}

function QuestionForm({
  interviewId,
  question,
  initial,
}: {
  interviewId: string;
  question: Question;
  initial: string;
}) {
  const [draft, setDraft] = useState(initial);
  const [prompt, setPrompt] = useState(question.prompt);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;
    void phraseQuestion({
      questionId: question.id,
      canonicalPrompt: question.prompt,
    }).then((next) => {
      if (!cancel) setPrompt(next);
    });
    return () => {
      cancel = true;
    };
  }, [question.id, question.prompt]);

  function save(skipped: boolean) {
    const result = recordAnswer(
      getFamilySnapshot(),
      interviewId,
      question,
      draft,
      skipped,
      new Date().toISOString(),
    );
    if (!result.ok) {
      setError(
        result.reason === "account_number"
          ? result.error || ACCOUNT_NUMBER_ERROR
          : "Enter a name to continue.",
      );
      return;
    }
    updateFamily(() => result.state);
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        save(false);
      }}
    >
      <p className="cs-vector">{question.vectorLabel}</p>
      <label className="cs-prompt" htmlFor="care-split-answer">
        {prompt}
      </label>
      <textarea
        id="care-split-answer"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        rows={6}
      />
      <button type="submit" className="cs-btn">
        Save and continue
      </button>
      {canSkip(question) && (
        <button type="button" className="cs-btn cs-btn-secondary" onClick={() => save(true)}>
          Skip this question
        </button>
      )}
      {error && (
        <p className="cs-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

export function InterviewSession({ id }: { id: string }) {
  const state = useFamily();
  const interview = state.interviews.find((item) => item.id === id);
  const [lookAt, setLookAt] = useState<number | null>(null);

  if (!interview) {
    return (
      <>
        <CareNav />
        <main className="cs-section">
          <div className="cs-wrap">
            <h1>Interview</h1>
            <p>This interview is not on this device.</p>
            <p>
              <Link href="/care-split/interview">Back to interviews</Link>
            </p>
          </div>
        </main>
      </>
    );
  }

  const questions = relevantQuestions(interview.variant, interview.answers);
  const unanswered = questions.findIndex(
    (question) => !interview.answers.some((answer) => answer.questionId === question.id),
  );
  const done = interview.status === "complete" && lookAt === null;
  const index = done ? questions.length - 1 : (lookAt ?? (unanswered === -1 ? questions.length - 1 : unanswered));
  const question = questions[index];
  const saved = question
    ? interview.answers.find((answer) => answer.questionId === question.id)
    : undefined;

  return (
    <>
      <CareNav />
      <main className="cs-section">
        <div className="cs-wrap">
          <h1>{interview.variant === "parent" ? "Parent interview" : "Sibling interview"}</h1>
          <p>One question. Saved on this device after each answer. This record has no score.</p>
          {done ? (
            <>
              <p>This interview is saved. It records what was reported.</p>
              <p>
                <Link href="/care-split/sheet">Open the Split Sheet</Link>
              </p>
            </>
          ) : (
            question && (
              <QuestionForm
                key={question.id}
                interviewId={interview.id}
                question={question}
                initial={saved?.report ?? ""}
              />
            )
          )}
          {interview.answers.length > 0 && (
            <p role="status">Saved on this device.</p>
          )}
          <div className="cs-row">
            {index > 0 && (
              <button type="button" className="cs-btn cs-btn-secondary" onClick={() => setLookAt(index - 1)}>
                Previous question
              </button>
            )}
            {lookAt !== null && (
              <button type="button" className="cs-btn cs-btn-secondary" onClick={() => setLookAt(null)}>
                Back to the open question
              </button>
            )}
          </div>
          <button
            type="button"
            className="cs-btn cs-btn-secondary"
            onClick={() =>
              downloadJson(`${interview.id}.json`, interviewFile(interview))
            }
          >
            Save interview file
          </button>
          {currentQuestion(interview.variant, interview.answers) === null && (
            <p>
              <Link href="/care-split/sheet">Open the Split Sheet</Link>
            </p>
          )}
        </div>
      </main>
    </>
  );
}

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
