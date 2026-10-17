/** Approved course-page wording (claims 1–6). Lesson pages repeat these verbatim. */
export const COURSE_BOUNDARY = [
  "Caregiver Communication & De-escalation teaches communication principles drawn from the Invocation books.",
  "Lessons teach communication mechanics, not therapy, medical advice, dementia treatment, or crisis intervention.",
  "The Invocation books are not dementia-care manuals and do not teach dementia-specific techniques.",
  "When a lesson uses a caregiving scenario, it applies general communication principles from the books to that scenario. The scenario itself is not a topic taught by the books.",
  "This educational product does not diagnose, treat, or determine the cause of a person's behavior.",
  "Communication principles may be useful to practice, but this product does not promise a particular response or outcome.",
] as const;

/** Approved service-boundary sentences (claims 19–20). Kept outside the crisis block. */
export const SERVICE_BOUNDARY = [
  "This product is educational and is not a crisis service.",
  "This product does not provide emergency monitoring or emergency response.",
] as const;

export const LESSON_BOUNDARY = [...COURSE_BOUNDARY, ...SERVICE_BOUNDARY] as const;
