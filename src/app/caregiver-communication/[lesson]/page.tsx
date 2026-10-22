import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompletionControl } from "@/components/caregiver-communication/CompletionControl";
import { CrisisBlock } from "@/components/caregiver-communication/CrisisBlock";
import { Quiz } from "@/components/caregiver-communication/Quiz";
import {
  getLesson,
  lessons,
  type LessonApplication,
} from "@/lib/caregiver-communication/lessons";

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

function ApplicationSections({
  lessonNumber,
  block,
  idSuffix,
}: {
  lessonNumber: string;
  block: LessonApplication;
  idSuffix?: string;
}) {
  const applicationHeading = idSuffix
    ? `application-heading-${idSuffix}`
    : "application-heading";
  const scriptHeading = idSuffix ? `script-heading-${idSuffix}` : "script-heading";

  return (
    <>
      <section aria-labelledby={applicationHeading}>
        <h2 id={applicationHeading}>Application</h2>
        <p>{block.applicationLabel}</p>
        {block.scenarioClaim ? <p>{block.scenarioClaim}</p> : null}
        {block.application.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section aria-labelledby={scriptHeading}>
        <h2 id={scriptHeading}>Script</h2>
        {block.script.map((paragraph) => (
          <p key={paragraph} className="cc-script">
            {paragraph}
          </p>
        ))}
      </section>

      <Quiz
        lessonNumber={lessonNumber}
        questions={block.quiz}
        quizKey={block.quizKey}
      />
    </>
  );
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

      {lesson.applicationLabel ? (
        <ApplicationSections
          lessonNumber={lesson.number}
          block={{
            applicationLabel: lesson.applicationLabel,
            scenarioClaim: lesson.scenarioClaim,
            application: lesson.application,
            script: lesson.script,
            quiz: lesson.quiz,
          }}
        />
      ) : null}
      {lesson.extraApplications?.map((block) => (
        <ApplicationSections
          key={block.quizKey ?? block.applicationLabel}
          lessonNumber={lesson.number}
          block={block}
          idSuffix={block.quizKey}
        />
      ))}

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
