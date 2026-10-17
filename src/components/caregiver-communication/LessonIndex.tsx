"use client";

import Link from "next/link";
import { useProgress } from "@/components/caregiver-communication/use-progress";

export function LessonIndex({
  lessons,
}: {
  lessons: { number: string; title: string }[];
}) {
  const completed = useProgress().completed;

  return (
    <ol className="cc-index">
      {lessons.map((lesson) => (
        <li key={lesson.number}>
          <Link href={`/caregiver-communication/${lesson.number}`}>
            {lesson.title}
          </Link>
          {completed.includes(lesson.number) ? (
            <span className="cc-index-status"> Marked complete on this device.</span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
