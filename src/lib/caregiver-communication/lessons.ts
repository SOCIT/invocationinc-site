/**
 * Seven lessons. Order: the listener-principle lesson (Claude structure
 * Lesson 1) restored as Lesson 1 per issue #8; the 2026-10-17 synthesis
 * order follows as Lessons 2-7. Scripts and quizzes are paired with
 * their mechanic. Lesson 3 (the 4% rule) script/quiz were written from
 * the filled mechanic. Issue #8 resolutions: Lesson 4's label states
 * the sibling scenario is not a hard moment; the sundowning application
 * stays paired with Lesson 5 (feeling, mood, baseline), its mechanic.
 */

export type QuizChoice = {
  id: string;
  text: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  choices: QuizChoice[];
  answer: string;
};

export type Lesson = {
  number: string;
  title: string;
  mechanic: string[];
  applicationLabel: string;
  scenarioClaim?: string;
  application: string[];
  script: string[];
  quiz: QuizQuestion[];
  sources: string[];
  showWhen?: boolean;
};

const expectationsMechanic = [
  "An expectation said out loud. State a need once, as a plain request, instead of letting it leak out as complaint, whining, or nagging.",
  "A need can be expressed as a clear, plain-language request rather than an indirect complaint.",
];

const expectationsSource = [
  "Frame: How to Like People.",
  "Supporting. Source: How to Train Your Partner, Chapter 10 — Expectations and complaints.",
];

export const lessons: Lesson[] = [
  {
    number: "1",
    title: "Communication is what the listener does",
    mechanic: [
      "\"Communication is what the listener does.\" Your message is what the other person does with your words, not what you meant by them.",
      "Listening and understanding matter more than merely delivering a message.",
    ],
    applicationLabel: "Application exercise. Repeated questions.",
    application: [
      "Your mother asks when your sister is arriving. You say four o'clock. Ten minutes later she asks again, and you answer, \"I just told you.\" She goes quiet and looks worried.",
      "Applying the mechanic: the question coming back tells you what she did with your words. Instead of repeating a sentence that didn't land, you treat the next answer as a new message, and you watch what she does with it.",
    ],
    script: ['"Linda is coming at four. I\'ll sit with you until then."'],
    quiz: [
      {
        id: "q1",
        prompt: "Under the listener principle, what counts as having communicated?",
        choices: [
          { id: "a", text: "Saying it clearly" },
          { id: "b", text: "What the listener does with what you said" },
          { id: "c", text: "Saying it more than once" },
        ],
        answer:
          "Answer: b. Communication is what the listener does.",
      },
      {
        id: "q2",
        prompt:
          "You gave an answer and the same question came back ten minutes later. Which response applies the principle?",
        choices: [
          { id: "a", text: "\"I just told you.\"" },
          {
            id: "b",
            text: "Treat the returned question as information about what the listener did with your words, and give a short, plain answer",
          },
          { id: "c", text: "Say it louder" },
        ],
        answer:
          "Answer: b. This changes what you do next.",
      },
      {
        id: "q3",
        prompt: 'True or false: "If I said it clearly, it was communicated."',
        choices: [
          { id: "true", text: "True" },
          { id: "false", text: "False" },
        ],
        answer:
          "Answer: False. Under the principle, communication is what the listener does, so how clearly you said it is only half of it.",
      },
    ],
    sources: [
      "Frame: How to Like People.",
      "Supporting. Source: How to Train Your Partner, Chapter 2 — Communication.",
    ],
  },
  {
    number: "2",
    title: "Your state first",
    mechanic: [
      "How to Like People, Chapter 1, It starts with a smile, installs the SmileBell: genuine happiness on demand, fired by a touch trigger you set on purpose.",
      "The Third Bell is Jonah's extension of that mechanic — not content from How to Like People or Eight Weeks to Happy. The Third Bell is genuine sadness on command, so a caregiver can meet a parent in their emotional register instead of forcing cheer.",
      "It acts on the caregiver's own state only, and the return to neutral is taught in the same breath.",
    ],
    applicationLabel:
      "Application exercise. The caregiver's own state. The Third Bell is Jonah's extension, not content from How to Like People or Eight Weeks to Happy.",
    application: [
      "You set the Third Bell, Jonah's extension, on your own state: genuine sadness on command, then the return to neutral in the same breath. You do not use it to determine the cause of a person's behavior.",
    ],
    script: ['Say to yourself first: "I can be sad with them for a minute. Then I come back to neutral."'],
    quiz: [
      {
        id: "q1",
        prompt: "What does How to Like People, Chapter 1 install?",
        choices: [
          { id: "a", text: "A way to determine the cause of a person's behavior" },
          {
            id: "b",
            text: "The SmileBell: genuine happiness on demand, with a touch trigger",
          },
          { id: "c", text: "A promised response from the other person" },
        ],
        answer:
          "Answer: b. The SmileBell is the Chapter 1 mechanic: genuine happiness on demand, with a touch trigger.",
      },
      {
        id: "q2",
        prompt: "What is the Third Bell?",
        choices: [
          { id: "a", text: "Content from How to Like People" },
          { id: "b", text: "Content from Eight Weeks to Happy" },
          { id: "c", text: "Jonah's extension of the book's mechanic" },
        ],
        answer:
          "Answer: c. The Third Bell is Jonah's extension. It is not content from How to Like People or Eight Weeks to Happy. It acts on the caregiver's own state only, and the return to neutral is taught in the same breath.",
      },
      {
        id: "q3",
        prompt:
          'The Third Bell is Jonah\'s extension, not content from How to Like People or Eight Weeks to Happy. True or false: "It changes the other person\'s state and promises they will calm down."',
        choices: [
          { id: "true", text: "True" },
          { id: "false", text: "False" },
        ],
        answer:
          "Answer: False. The Third Bell acts on the caregiver's own state only.",
      },
    ],
    sources: [
      "Source: How to Like People, Chapter 1 — It starts with a smile.",
      "The Third Bell is Jonah's extension. It is not content from How to Like People or Eight Weeks to Happy.",
    ],
  },
  {
    number: "3",
    title: "Give them the 4%",
    mechanic: [
      "How to Like People, Part 1, The 4% Rule of Conversation. 80% of communication is nonverbal, and 20% is spoken. Of the spoken part, about 80% should be the other person.",
      "That leaves a focused and powerful 4% for your verbal communication. Give them the 4%. That pause is not rejection.",
    ],
    applicationLabel: "Application exercise. Accusations of stealing or lying.",
    application: [
      "Your father says you took his wallet. You didn't. You feel the sting of being accused.",
      "Applying the mechanic: you give them the 4%. Most of the spoken part stays with him. Your pause is not rejection. You do not decide why he said it.",
    ],
    script: ['"I\'m here. I\'ll listen."'],
    quiz: [
      {
        id: "q1",
        prompt:
          "Under the 4% Rule of Conversation, who does most of the spoken part?",
        choices: [
          { id: "a", text: "You, so your message gets delivered" },
          { id: "b", text: "The other person" },
          { id: "c", text: "Whoever speaks louder" },
        ],
        answer:
          "Answer: b. Of the spoken part, about 80% should be the other person.",
      },
      {
        id: "q2",
        prompt:
          "You were accused, and you want to explain at length. Which response applies the mechanic?",
        choices: [
          {
            id: "a",
            text: "Give them the 4%, and treat the pause as not rejection",
          },
          {
            id: "b",
            text: "Keep explaining until they take the accusation back",
          },
          { id: "c", text: "Decide why they made the accusation" },
        ],
        answer:
          "Answer: a. Option b aims at a particular response. Option c would determine the cause of a person's behavior, which this product does not do.",
      },
      {
        id: "q3",
        prompt: 'True or false: "That pause is rejection."',
        choices: [
          { id: "true", text: "True" },
          { id: "false", text: "False" },
        ],
        answer:
          "Answer: False. That pause is not rejection.",
      },
    ],
    sources: [
      "Source: How to Like People, Part 1 — The 4% Rule of Conversation.",
    ],
  },
  {
    number: "4",
    title: "Say the need once",
    mechanic: expectationsMechanic,
    applicationLabel:
      "Application exercise. Asking a sibling for one specific task. Sibling scenario; not a hard moment.",
    application: [
      'You\'ve taken your mother to every appointment for months. Lately you\'ve said things like, "Must be nice to have your weekends free." Your brother hears a complaint, not a request.',
      "Applying the mechanic: you state the need once, plainly, as a request with one specific thing in it.",
    ],
    script: [
      '"I need you to take Mom to her Thursday appointment this month. Can you do that?"',
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Which one is a plain request?",
        choices: [
          { id: "a", text: '"You never help."' },
          { id: "b", text: '"Someone should really do more around here."' },
          {
            id: "c",
            text: '"I need you to take Mom to her Thursday appointment. Can you?"',
          },
        ],
        answer:
          "Answer: c. It states one need, plainly, as a request. The others leak the need out as complaint.",
      },
      {
        id: "q2",
        prompt: "Which describes the mechanic?",
        choices: [
          { id: "a", text: "Mention the need often until it's heard" },
          { id: "b", text: "State the need once, as a plain request" },
          { id: "c", text: "Hint, and hope it's picked up" },
        ],
        answer: "Answer: b.",
      },
      {
        id: "q3",
        prompt:
          'True or false: "Stating a need once as a plain request means the person will say yes."',
        choices: [
          { id: "true", text: "True" },
          { id: "false", text: "False" },
        ],
        answer:
          "Answer: False. The mechanic makes the need clear.",
      },
    ],
    sources: expectationsSource,
  },
  {
    number: "5",
    title: "Feeling, mood, baseline",
    mechanic: [
      "Your state is what the room experiences. Learn to tell a feeling, a mood, and a baseline apart.",
      "Supporting source, Eight Weeks to Happy. A feeling lasts under ninety seconds. Past that, it is a mood. A mood that does not leave is the baseline. The baseline is what other people experience as you.",
      "Eight Weeks to Happy discusses how a person's emotional state and baseline affect what others experience.",
    ],
    applicationLabel: "Application exercise. Sundowning agitation.",
    application: [
      'It\'s late afternoon. Your father is restless and pacing. You\'ve had a long day, and when you say, "Dad, please calm down," your voice is tight.',
      "Applying the mechanic: before your words, your own state is part of what the room experiences. You notice your state first. You don't try to decide why he's restless, because this product does not determine the cause of a person's behavior.",
    ],
    script: [
      'Say to yourself first: "I\'m tense, and that\'s part of this room." Then say to him: "I\'m here. I\'m going to sit down next to you."',
    ],
    quiz: [
      {
        id: "q1",
        prompt: "According to the mechanic, what does the room experience?",
        choices: [
          { id: "a", text: "Only your words" },
          { id: "b", text: "Your state" },
          { id: "c", text: "Only what you intended" },
        ],
        answer: "Answer: b.",
      },
      {
        id: "q2",
        prompt: "Which comes first when you apply this mechanic?",
        choices: [
          { id: "a", text: "Decide what is causing the other person's behavior" },
          { id: "b", text: "Notice your own state before you speak" },
          { id: "c", text: 'Say "calm down" more firmly' },
        ],
        answer:
          "Answer: b. Noticing your own state is within your reach. Determining the cause of someone's behavior is not something this product does.",
      },
      {
        id: "q3",
        prompt:
          "A caregiver says all the right words in a tight voice. Under this mechanic, what is true?",
        choices: [
          { id: "a", text: "The words are the whole message" },
          { id: "b", text: "Her state is part of what the room experiences" },
        ],
        answer:
          "Answer: b. The mechanic describes what the room experiences.",
      },
    ],
    sources: [
      "Frame: How to Like People.",
      "Supporting. Source: Eight Weeks to Happy — emotional state, mood, and baseline.",
    ],
  },
  {
    number: "6",
    title: "Reframe your own remembering",
    mechanic: [
      "Changing the emotion attached to remembering. Her frame, not the parent's. The frame in this lesson is the caregiver's own remembering, not the parent's.",
      "How to Like People, Chapter 8 is Reframing. How to Train Your Partner, Chapter 8, discusses changing the emotion associated with a past experience within its relationship-communication framework. That chapter is a supporting source.",
    ],
    applicationLabel: 'Application exercise. The "take me home" loop.',
    application: [
      "It's 3:30 in the afternoon and you're already dreading the evening. Last night your mother asked to go home again and again, and you ended up in tears in the kitchen. You're carrying that remembering into the next conversation.",
      "Applying the mechanic: you notice the emotion attached to remembering last night, and you work on changing it before the evening starts.",
    ],
    script: [
      'Script (draft, to say aloud to yourself or to someone you trust): "Last night was hard. That was last night. I\'m starting this evening fresh."',
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What is this lesson about?",
        choices: [
          { id: "a", text: "The emotion attached to remembering" },
          { id: "b", text: "Winning the conversation" },
          { id: "c", text: "Finding the cause of someone's behavior" },
        ],
        answer: "Answer: a.",
      },
      {
        id: "q2",
        prompt: "Before the evening starts, which applies the mechanic?",
        choices: [
          { id: "a", text: "Replay last night in detail to prepare" },
          {
            id: "b",
            text: "Notice the emotion attached to remembering last night, and work on changing it",
          },
          { id: "c", text: "Plan what to say to make her stop asking" },
        ],
        answer:
          "Answer: b.",
      },
      {
        id: "q3",
        prompt:
          'True or false: "This mechanic promises the evening will go differently."',
        choices: [
          { id: "true", text: "True" },
          { id: "false", text: "False" },
        ],
        answer:
          "Answer: False.",
      },
    ],
    sources: [
      "Source: How to Like People, Chapter 8 — Reframing.",
      "Supporting. Source: How to Train Your Partner, Chapter 8 — Changing the Past.",
    ],
  },
  {
    number: "7",
    title: "The hard ask, once",
    mechanic: expectationsMechanic,
    applicationLabel: "Application exercise. Refusal of care.",
    application: [
      'It\'s time for your mother\'s shower and she says no. You\'ve already said, "Come on, Mom, we talked about this," and "Please, just do it," and your voice is climbing. Those lines aren\'t a request. The need is leaking out as nagging.',
      "Applying the mechanic: you state the need once, plainly, as a request, and you don't keep restating it in pleading versions.",
    ],
    script: ['"I need you to come to the bathroom with me. Will you walk with me?"'],
    quiz: [
      {
        id: "q1",
        prompt: "Which one states the need once, as a plain request?",
        choices: [
          {
            id: "a",
            text: '"Come on, Mom, please, just do it, we talked about this."',
          },
          {
            id: "b",
            text: '"I need you to come to the bathroom with me. Will you walk with me?"',
          },
          { id: "c", text: '"You always make this so hard."' },
        ],
        answer: "Answer: b.",
      },
      {
        id: "q2",
        prompt: "Under the mechanic, what turns a need into nagging?",
        choices: [
          { id: "a", text: "Stating it once, plainly" },
          {
            id: "b",
            text: "Restating it over and over as pleading and complaint",
          },
        ],
        answer: "Answer: b.",
      },
      {
        id: "q3",
        prompt:
          'True or false: "If the answer is no, the request wasn\'t a plain one."',
        choices: [
          { id: "true", text: "True" },
          { id: "false", text: "False" },
        ],
        answer:
          "Answer: False. A plain request does not promise a yes.",
      },
    ],
    sources: expectationsSource,
    showWhen: true,
  },
];

export function getLesson(number: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.number === number);
}
