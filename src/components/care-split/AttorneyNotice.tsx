import { ATTORNEY_NOTICE_BODY, ATTORNEY_NOTICE_TITLE } from "@/lib/care-split/claims";

export function AttorneyNotice() {
  return (
    <aside className="cs-attorney" role="note" aria-label="Attorney review notice">
      <p className="cs-attorney-title">{ATTORNEY_NOTICE_TITLE}</p>
      <p>{ATTORNEY_NOTICE_BODY}</p>
    </aside>
  );
}
