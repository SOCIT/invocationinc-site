"use client";

import Link from "next/link";
import { CLAIMS } from "@/lib/care-split/claims";
import { buildSheet } from "@/lib/care-split/sheet";
import { isApproved } from "@/lib/care-split/state";
import { useFamily } from "@/lib/care-split/storage";
import { buildWorksheetDocument, type WorksheetSurface } from "@/lib/care-split/worksheet-doc";
import { AttorneyNotice } from "./AttorneyNotice";
import { CareNav } from "./CareNav";
import { downloadText } from "./download";

const LINKS: { href: string; label: string; surface: WorksheetSurface }[] = [
  { href: "/care-split/worksheet", label: "Cover", surface: "cover" },
  { href: "/care-split/worksheet/preview", label: "Preview", surface: "preview" },
  { href: "/care-split/worksheet/download", label: "Download", surface: "download" },
  { href: "/care-split/worksheet/packet", label: "Packet", surface: "packet" },
];

const TITLES: Record<WorksheetSurface, string> = {
  cover: "Personal Care Agreement preparation worksheet",
  preview: "Worksheet preview",
  download: "Worksheet download",
  packet: "Generated packet",
};

export function WorksheetView({ surface }: { surface: WorksheetSurface }) {
  const state = useFamily();
  const sheet = buildSheet(state.interviews);
  const approved = isApproved(state);
  const documentText = buildWorksheetDocument({ surface, sheet, approved });

  return (
    <>
      <CareNav />
      <main className="cs-section" data-surface={surface}>
        <div className="cs-wrap">
          <AttorneyNotice />
          <h1>{TITLES[surface]}</h1>
          <nav className="cs-subnav" aria-label="Worksheet surfaces">
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} aria-current={link.surface === surface ? "page" : undefined}>
                {link.label}
              </Link>
            ))}
          </nav>
          {CLAIMS.pca.map((line) => (
            <p key={line}>{line}</p>
          ))}
          {surface !== "cover" && (
            <>
              <h2>Reported preparation notes (proposed)</h2>
              {sheet.rows.length === 0 && <p>Not reported.</p>}
              {sheet.rows.map((row) => (
                <article key={row.person} className="cs-card">
                  <h3>{row.person}</h3>
                  <p>
                    <span className="cs-kicker">Reported tasks and hours</span>
                    {row.reportedTasksAndHours}
                  </p>
                  <p>
                    <span className="cs-kicker">Who might pay</span>
                    {row.whoMightPay}
                  </p>
                  <p>
                    <span className="cs-kicker">Who might be the backup</span>
                    {row.whoMightBeBackup}
                  </p>
                </article>
              ))}
              <h2>Respite line</h2>
              <p>{sheet.respiteLine}</p>
              <h2>Suggested check-ins</h2>
              <p>{sheet.suggestedCheckIns}</p>
              {sheet.poaRedFlag && sheet.poaRedFlagText && (
                <aside className="cs-flag" role="status">
                  <h2>Elder-law attorney review flag</h2>
                  <p>{sheet.poaRedFlagText}</p>
                </aside>
              )}
              {CLAIMS.benefits.map((line) => (
                <p key={line}>{line}</p>
              ))}
              {CLAIMS.tax.map((line) => (
                <p key={line}>{line}</p>
              ))}
              {CLAIMS.limits.map((line) => (
                <p key={line}>{line}</p>
              ))}
              {CLAIMS.commitments.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </>
          )}
          {surface === "packet" && (
            <p>
              {approved
                ? "The organizer approved this Split Sheet."
                : "Not approved to share. Nothing goes to your siblings until you approve it."}
            </p>
          )}
          {surface === "download" && (
            <>
              <button
                type="button"
                className="cs-btn"
                onClick={() =>
                  downloadText(
                    "care-split-personal-care-agreement-worksheet.txt",
                    documentText,
                    "text/plain;charset=utf-8",
                  )
                }
              >
                Download worksheet
              </button>
              <pre className="cs-doc">{documentText}</pre>
            </>
          )}
        </div>
      </main>
    </>
  );
}
