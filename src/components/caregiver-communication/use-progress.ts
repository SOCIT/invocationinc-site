"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  getProgressServerSnapshot,
  getProgressSnapshot,
  parseProgress,
  subscribeProgress,
  type Progress,
} from "@/lib/caregiver-communication/storage";

export function useProgress(): Progress {
  const raw = useSyncExternalStore(
    subscribeProgress,
    getProgressSnapshot,
    getProgressServerSnapshot,
  );
  return useMemo(() => parseProgress(raw), [raw]);
}
