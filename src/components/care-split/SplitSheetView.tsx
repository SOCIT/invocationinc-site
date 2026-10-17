"use client";

import { useState } from "react";
import Link from "next/link";
import { CLAIMS } from "@/lib/care-split/claims";
import { findParagraph } from "@/lib/care-split/sections";
import { buildSheet } from "@/lib/care-split/sheet";
import {
  approveSheet,
  canApprove,
  importInterview,
  isApproved,
} from "@/lib/care-split/state";
import { getFamilySnapshot, updateFamily, useFamily } from "@/lib/care-split/storage";
import { CareNav } from "./CareNav";

const proposal = findParagraph("In plain words, it’s a proposal.");
const approvalLine = findParagraph("Nothing goes to your siblings until you approve it.");

export function SplitSheetView() {
  const state = useFamily();
  const sheet = buildSheet(state.interviews);
  const approved = isApproved(state);
  const stale = Boolean(state.approvedAt) && !approved;
  const [fileError, setFileError] = useState<string | null>(null);

  function approve() {
    updateFamily((current) => approveSheet(current, new Date().toISOString()));
  }

  async function onFile(file: File | undefined) {
    if (!file) return;
    setFileError(null);
    try {
      const parsed = JSON.parse(await file.text()) as unknown;
      const result = importInterview(getFamilySnapshot(), parsed);
      if (!result.ok) {
        setFileError(
          result.reason === "not_started_here"
            ? "This interview was not started on this device."
            : "That file could not be read.",
        );
        return;
      }
      updateFamily(() => result.state);
    } catch {
      setFileError("That file could not be read.");
    }
  }

  return (
    <>
      <CareNav />
      <main className="cs-section">
        <div className="cs-wrap">
          <h1>Split Sheet</h1>
          <p>{CLAIMS.produces[0]}</p>
          <p>{proposal}</p>
          <p>{CLAIMS.commitments[0]}</p>
          <p>{approvalLine}</p>
          {stale && <p>Answers changed after approval. {approvalLine}</p>}
          {approved && <p>You approved this Split Sheet.</p>}

          <h2>Task inventory</h2>
          {sheet.rows.length === 0 && <p>Not reported.</p>}
          {sheet.rows.map((row) => (
            <article key={row.person} className="cs-card">
              <h3>{row.person}</h3>
              <p>
                <span className="cs-kicker">Reported tasks and hours</span>
                {row.reportedTasksAndHours}
              </p>
              <p>
                <span className="cs-kicker">Who might do this (proposed)</span>
                {row.whoMightDo}
              </p>
              <p>
                <span className="cs-kicker">Who might pay (proposed)</span>
                {row.whoMightPay}
              </p>
              <p>
                <span className="cs-kicker">Who might be the backup (proposed)</span>
                {row.whoMightBeBackup}
              </p>
            </article>
          ))}

          <h2>Proposed labels</h2>
          <p>{findParagraph("WHEN records what each person reports.")}</p>
          <ul>
            {sheet.legend.map((item) => (
              <li key={item.label}>
                {item.when} → {item.label}
              </li>
            ))}
          </ul>
          {sheet.labels.length === 0 && <p>No proposed label from what was reported.</p>}
          {sheet.labels.map((item) => (
            <p key={item.person}>
              {item.person}:{" "}
              {item.labels.length
                ? item.labels.map((label, index) => `${label} (${item.because[index]})`).join("; ")
                : "No proposed label from what was reported."}
            </p>
          ))}

          <h2>Respite line</h2>
          <p>{sheet.respiteLine}</p>

          <h2>Suggested check-ins</h2>
          <p>{sheet.suggestedCheckIns}</p>

          {sheet.parentDays.length > 0 && (
            <>
              <h2>What the day looks like, in the parent&apos;s own words</h2>
              {sheet.parentDays.map((day) => (
                <article key={day.name} className="cs-card">
                  <h3>{day.name}</h3>
                  {day.lines.map((line) => (
                    <p key={line.prompt}>
                      <span className="cs-kicker">{line.prompt}</span>
                      {line.report}
                    </p>
                  ))}
                </article>
              ))}
            </>
          )}

          <div data-poa-flag={sheet.poaRedFlag ? "on" : "off"}>
            {sheet.poaRedFlag && sheet.poaRedFlagText && (
              <aside className="cs-flag" role="status">
                <h2>Elder-law attorney review flag</h2>
                <p>{sheet.poaRedFlagText}</p>
              </aside>
            )}
          </div>

          {CLAIMS.limits.map((line) => (
            <p key={line}>{line}</p>
          ))}

          <button
            type="button"
            className="cs-btn"
            disabled={!canApprove(state)}
            onClick={approve}
          >
            Approve this Split Sheet
          </button>
          {!canApprove(state) && <p>Save an interview answer before approval.</p>}
          {approved && (
            <p>
              <Link href="/care-split/meeting">Open the family meeting page</Link>
              {" · "}
              <Link href="/care-split/worksheet/packet">Open the packet</Link>
            </p>
          )}

          <h2>Interview file</h2>
          <p>Add an interview file that was started on this device.</p>
          <label className="cs-file">
            Add an interview file
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
