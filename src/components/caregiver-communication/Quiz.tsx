"use client";

import type { QuizQuestion } from "@/lib/caregiver-communication/lessons";
import { saveQuizAnswer } from "@/lib/caregiver-communication/storage";
import { useProgress } from "@/components/caregiver-communication/use-progress";

export function Quiz({
  lessonNumber,
  questions,
}: {
  lessonNumber: string;
  questions: QuizQuestion[];
}) {
  const progress = useProgress();
  const answers = progress.answers[lessonNumber] ?? {};

  return (
    <section className="cc-quiz" aria-labelledby="quiz-heading">
      <h2 id="quiz-heading">Quiz</h2>
      <ol className="cc-questions">
        {questions.map((question, index) => {
          const selected = answers[question.id];
          return (
            <li key={question.id}>
              <fieldset>
                <legend>
                  {index + 1}. {question.prompt}
                </legend>
                <div className="cc-choices">
                  {question.choices.map((choice) => {
                    const inputId = `lesson-${lessonNumber}-${question.id}-${choice.id}`;
                    return (
                      <label key={choice.id} className="cc-choice" htmlFor={inputId}>
                        <input
                          id={inputId}
                          type="radio"
                          name={`${lessonNumber}-${question.id}`}
                          value={choice.id}
                          checked={selected === choice.id}
                          onChange={() =>
                            saveQuizAnswer(lessonNumber, question.id, choice.id)
                          }
                        />
                        <span>
                          {choice.id.length === 1
                            ? `${choice.id}) ${choice.text}`
                            : choice.text}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {selected ? (
                  <p className="cc-answer" aria-live="polite">
                    {question.answer}
                  </p>
                ) : (
                  <p className="cc-answer-pending">Answer shown after you choose.</p>
                )}
              </fieldset>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
