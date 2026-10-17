import { LessonIndex } from "@/components/caregiver-communication/LessonIndex";
import { COURSE_BOUNDARY } from "@/lib/caregiver-communication/boundary";
import { lessons } from "@/lib/caregiver-communication/lessons";

export default function CaregiverCoursePage() {
  return (
    <main className="cc-main">
      <p className="lf-stamp">Invocation Inc</p>
      <h1>Caregiver Communication &amp; De-escalation</h1>
      <ul className="cc-boundary">
        {COURSE_BOUNDARY.map((sentence) => (
          <li key={sentence}>{sentence}</li>
        ))}
      </ul>
      <h2>Lessons</h2>
      <LessonIndex
        lessons={lessons.map((lesson) => ({
          number: lesson.number,
          title: lesson.title,
        }))}
      />
    </main>
  );
}
