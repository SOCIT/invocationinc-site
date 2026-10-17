"use client";

import { useSyncExternalStore } from "react";
import { emptyChecks, toggleCheck } from "./only-child";
import { emptyState, sanitizeState, type FamilyState } from "./state";

const FAMILY_KEY = "care-split.family.v1";
const CHECK_KEY = "care-split.only-child.v1";

const SERVER_FAMILY = emptyState();
let familySnapshot: FamilyState = SERVER_FAMILY;
let familyLoaded = false;
const familyListeners = new Set<() => void>();

const SERVER_CHECKS = emptyChecks();
let checkSnapshot: boolean[] = SERVER_CHECKS;
let checksLoaded = false;
const checkListeners = new Set<() => void>();

function readFamily(): FamilyState {
  if (familyLoaded) return familySnapshot;
  familyLoaded = true;
  if (typeof window === "undefined") return familySnapshot;
  try {
    const raw = window.localStorage.getItem(FAMILY_KEY);
    familySnapshot = raw ? sanitizeState(JSON.parse(raw)) : emptyState();
  } catch {
    familySnapshot = emptyState();
  }
  return familySnapshot;
}

function writeFamily(next: FamilyState) {
  familySnapshot = next;
  window.localStorage.setItem(FAMILY_KEY, JSON.stringify(next));
  familyListeners.forEach((listener) => listener());
}

export function subscribeFamily(listener: () => void) {
  familyListeners.add(listener);
  return () => familyListeners.delete(listener);
}

export function getFamilySnapshot(): FamilyState {
  return readFamily();
}

export function getFamilyServerSnapshot(): FamilyState {
  return SERVER_FAMILY;
}

export function updateFamily(mutator: (state: FamilyState) => FamilyState) {
  writeFamily(mutator(readFamily()));
}

export function useFamily(): FamilyState {
  return useSyncExternalStore(subscribeFamily, getFamilySnapshot, getFamilyServerSnapshot);
}

function readChecks(): boolean[] {
  if (checksLoaded) return checkSnapshot;
  checksLoaded = true;
  if (typeof window === "undefined") return checkSnapshot;
  try {
    const raw = window.localStorage.getItem(CHECK_KEY);
    const parsed = raw ? (JSON.parse(raw) as { checks?: unknown }) : null;
    const checks = Array.isArray(parsed?.checks) ? parsed.checks : [];
    checkSnapshot = emptyChecks().map((value, index) =>
      typeof checks[index] === "boolean" ? checks[index] : value,
    );
  } catch {
    checkSnapshot = emptyChecks();
  }
  return checkSnapshot;
}

export function subscribeChecks(listener: () => void) {
  checkListeners.add(listener);
  return () => checkListeners.delete(listener);
}

export function getCheckSnapshot(): boolean[] {
  return readChecks();
}

export function getCheckServerSnapshot(): boolean[] {
  return SERVER_CHECKS;
}

export function useOnlyChildChecks(): boolean[] {
  return useSyncExternalStore(subscribeChecks, getCheckSnapshot, getCheckServerSnapshot);
}

export function setOnlyChildCheck(index: number) {
  const next = toggleCheck(readChecks(), index);
  checkSnapshot = next;
  window.localStorage.setItem(CHECK_KEY, JSON.stringify({ checks: next }));
  checkListeners.forEach((listener) => listener());
}
