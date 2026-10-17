export const ONLY_CHILD_COUNT = 10;

/** Checklist state. There is no score field. */
export function emptyChecks(): boolean[] {
  return Array.from({ length: ONLY_CHILD_COUNT }, () => false);
}

export function toggleCheck(checks: readonly boolean[], index: number): boolean[] {
  const next = checks.slice();
  if (index < 0 || index >= next.length) return next;
  next[index] = !next[index];
  return next;
}
