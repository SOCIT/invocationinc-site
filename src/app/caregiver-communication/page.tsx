import { LessonIndex } from "@/components/caregiver-communication/LessonIndex";
import { lessons } from "@/lib/caregiver-communication/lessons";

export default function CaregiverCoursePage() {
  return (
    <main className="cc-main">
      <p className="lf-stamp">Invocation Inc</p>
      <h1>Caregiver Communication &amp; De-escalation</h1>
      <p>
        These lessons help families plan and coordinate care — they aren’t a
        medical, legal, or financial service.
      </p>
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
