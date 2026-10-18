import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompletionControl } from "@/components/caregiver-communication/CompletionControl";
import { CrisisBlock } from "@/components/caregiver-communication/CrisisBlock";
import { Quiz } from "@/components/caregiver-communication/Quiz";
import { getLesson, lessons } from "@/lib/caregiver-communication/lessons";

export function generateStaticParams() {
  return lessons.map((lesson) => ({ lesson: lesson.number }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lesson: string }>;
}): Promise<Metadata> {
  const { lesson: number } = await params;
  const lesson = getLesson(number);
  if (!lesson) return {};
  return { title: lesson.title };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lesson: string }>;
}) {
  const { lesson: number } = await params;
  const lesson = getLesson(number);
  if (!lesson) notFound();

  return (
    <main className="cc-main">
      <p className="cc-crumb">
        <Link href="/caregiver-communication">
          Caregiver Communication &amp; De-escalation
        </Link>
        {" / "}
        Lesson {lesson.number}
      </p>
      <h1>{lesson.title}</h1>

      <section aria-labelledby="mechanic-heading">
        <h2 id="mechanic-heading">The mechanic</h2>
        {lesson.mechanic.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section aria-labelledby="application-heading">
        <h2 id="application-heading">Application</h2>
        <p>{lesson.applicationLabel}</p>
        {lesson.scenarioClaim ? <p>{lesson.scenarioClaim}</p> : null}
        {lesson.application.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section aria-labelledby="script-heading">
        <h2 id="script-heading">Script</h2>
        {lesson.script.map((paragraph) => (
          <p key={paragraph} className="cc-script">
            {paragraph}
          </p>
        ))}
      </section>

      <Quiz lessonNumber={lesson.number} questions={lesson.quiz} />

      <section className="cc-source" aria-labelledby="source-heading">
        <h2 id="source-heading">Source</h2>
        {lesson.sources.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <CrisisBlock />
      <CompletionControl lessonNumber={lesson.number} />
      {lesson.showWhen ? (
        <p className="cc-when" id="when-link">
          <Link href="/care-split">WHEN (Who Handles Each Need)</Link>
        </p>
      ) : null}
    </main>
  );
}
