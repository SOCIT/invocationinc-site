"use client";

import { useState } from "react";
import Link from "next/link";
import { buildReadAloud, MEETING_AGENDA } from "@/lib/care-split/meeting";
import { hardMomentScripts, type ModuleId } from "@/lib/care-split/sections";
import { buildSheet } from "@/lib/care-split/sheet";
import { isApproved } from "@/lib/care-split/state";
import { useFamily } from "@/lib/care-split/storage";
import { CareNav } from "./CareNav";

const MODULE_LABEL: Record<ModuleId, string> = {
  refusal: "The refusal",
  money_ask: "The money ask",
  break: "The break",
};

export function MeetingView() {
  const state = useFamily();
  const approved = isApproved(state);
  const scripts = hardMomentScripts();
  const [inserted, setInserted] = useState<Record<ModuleId, boolean>>({
    refusal: false,
    money_ask: false,
    break: false,
  });
  const page = buildReadAloud({ approved, inserted, scripts });
  const sheet = buildSheet(state.interviews);

  return (
    <>
      <CareNav />
      <main className="cs-section">
        <div className="cs-wrap">
          <h1>Family meeting</h1>
          {!approved || !page.approved ? (
            <>
              <p>The meeting page is generated from the approved sheet only.</p>
              <p>Nothing goes to your siblings until you approve it.</p>
              <p>
                <Link href="/care-split/sheet">Open the Split Sheet</Link>
              </p>
            </>
          ) : (
            <>
              <fieldset className="cs-modules">
                <legend>Insert a module</legend>
                {scripts.map((script) => (
                  <label key={script.id} className="cs-check">
                    <input
                      type="checkbox"
                      checked={inserted[script.id]}
                      onChange={() =>
                        setInserted((current) => ({
                          ...current,
                          [script.id]: !current[script.id],
                        }))
                      }
                    />
                    <span>
                      {MODULE_LABEL[script.id]} — {script.title}
                    </span>
                  </label>
                ))}
              </fieldset>
              <article className="cs-read" aria-label="Read-aloud page">
                <h2>Agenda</h2>
                <ol>
                  {MEETING_AGENDA.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
                <h2>Ground rules</h2>
                {page.groundRules.map((rule) => (
                  <p key={rule}>{rule}</p>
                ))}
                <h2>Proposed responsibilities</h2>
                {sheet.rows.length === 0 && <p>Not reported.</p>}
                {sheet.rows.map((row) => (
                  <p key={row.person}>
                    {row.person}. Reported tasks and hours: {row.reportedTasksAndHours}. Who might do this: {row.whoMightDo}. Who might pay: {row.whoMightPay}. Who might be the backup: {row.whoMightBeBackup}.
                  </p>
                ))}
                <h2>Respite line</h2>
                <p>{sheet.respiteLine}</p>
                <h2>Suggested check-ins</h2>
                <p>{sheet.suggestedCheckIns}</p>
                {page.modules.map((module) => (
                  <section key={module.id}>
                    <h2>
                      {MODULE_LABEL[module.id]} — {module.title}
                    </h2>
                    {module.lines.map((line) => (
                      <p key={line} className={line.startsWith("“") ? "cs-quote" : undefined}>
                        {line}
                      </p>
                    ))}
                  </section>
                ))}
              </article>
            </>
          )}
        </div>
      </main>
    </>
  );
}
