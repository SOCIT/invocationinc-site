"use client";

import { markLessonComplete } from "@/lib/caregiver-communication/storage";
import { useProgress } from "@/components/caregiver-communication/use-progress";

export function CompletionControl({ lessonNumber }: { lessonNumber: string }) {
  const done = useProgress().completed.includes(lessonNumber);

  return (
    <div className="cc-complete-wrap" id="lesson-complete">
      <button
        type="button"
        className="lf-btn lf-btn-red cc-complete"
        onClick={() => markLessonComplete(lessonNumber)}
        aria-pressed={done}
      >
        Mark lesson complete.
      </button>
      {done ? (
        <p className="cc-complete-status" role="status">
          Marked complete on this device.
        </p>
      ) : null}
    </div>
  );
}
