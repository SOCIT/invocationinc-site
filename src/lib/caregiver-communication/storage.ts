const STORAGE_KEY = "invocation.caregiver-communication.v1";
const CHANGE_EVENT = "invocation-caregiver-progress";

export type Progress = {
  completed: string[];
  answers: Record<string, Record<string, string>>;
};

const EMPTY: Progress = { completed: [], answers: {} };

function emit(): void {
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeProgress(onStoreChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function getProgressSnapshot(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

export function getProgressServerSnapshot(): string {
  return "";
}

export function parseProgress(raw: string): Progress {
  if (!raw) return EMPTY;
  try {
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return {
      completed: Array.isArray(parsed.completed)
        ? parsed.completed.filter((id) => typeof id === "string")
        : [],
      answers:
        parsed.answers && typeof parsed.answers === "object" ? parsed.answers : {},
    };
  } catch {
    return EMPTY;
  }
}

function persist(next: Progress): void {
  const serialized = JSON.stringify(next);
  try {
    if (window.localStorage.getItem(STORAGE_KEY) === serialized) return;
    window.localStorage.setItem(STORAGE_KEY, serialized);
    emit();
  } catch {
    // Private mode and full storage both leave progress on this page only.
  }
}

export function markLessonComplete(lessonNumber: string): void {
  const current = parseProgress(getProgressSnapshot());
  if (current.completed.includes(lessonNumber)) return;
  persist({
    ...current,
    completed: [...current.completed, lessonNumber],
  });
}

export function saveQuizAnswer(
  lessonNumber: string,
  questionId: string,
  choiceId: string,
): void {
  const current = parseProgress(getProgressSnapshot());
  const lessonAnswers = { ...(current.answers[lessonNumber] ?? {}) };
  lessonAnswers[questionId] = choiceId;
  persist({
    ...current,
    answers: { ...current.answers, [lessonNumber]: lessonAnswers },
  });
}
