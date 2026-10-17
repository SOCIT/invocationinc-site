// Buyer-facing copy for /care-split.
// Source: issue #4 comment 1, verbatim, with two approved substitutions:
// the human-review placeholder is HUMAN_REVIEW_SCOPE, and the product
// name token is WHEN (issue comment 4). The first mention on this page
// is "WHEN — Who Handles Each Need". Do not rewrite these strings.

export type CopyBlock =
  | { kind: "h1"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "li"; text: string }
  | { kind: "check"; text: string };

export const buyerBlocks: CopyBlock[] = [
  {
    "kind": "h1",
    "text": "You’ve been carrying this alone. Let’s get it on paper."
  },
  {
    "kind": "p",
    "text": "WHEN — Who Handles Each Need helps families organize caregiving concerns, document each participant’s reported availability and limits, and prepare for a structured family discussion about care responsibilities."
  },
  {
    "kind": "h2",
    "text": "Start with the free core"
  },
  {
    "kind": "h3",
    "text": "You already know how this goes"
  },
  {
    "kind": "p",
    "text": "You’re the one the pharmacy calls. You know the medication list, the appointment times, and which drawer the insurance papers are in."
  },
  {
    "kind": "p",
    "text": "Your siblings care. They also have opinions. One sends an article about assisted living. One asks if you’ve thought about hiring someone. One says, “Just tell me what you need.”"
  },
  {
    "kind": "p",
    "text": "Maybe you’ve thought something like this:"
  },
  {
    "kind": "li",
    "text": "I’m the one who gets the call."
  },
  {
    "kind": "li",
    "text": "Everyone has an opinion. Nobody has a Thursday."
  },
  {
    "kind": "li",
    "text": "I’m not angry. I’m tired."
  },
  {
    "kind": "li",
    "text": "If I got sick next week, I don’t know who would take over."
  },
  {
    "kind": "p",
    "text": "Nobody has asked what you can’t do. They’ve asked what your parent needs, and then they’ve waited for you to handle it."
  },
  {
    "kind": "p",
    "text": "Asking for help is hard when asking turns into an argument. WHEN is for the step before the argument: getting down, in one place, what each person says they can and can’t do."
  },
  {
    "kind": "h2",
    "text": "How it works"
  },
  {
    "kind": "h3",
    "text": "Step 1: Separate Interviews"
  },
  {
    "kind": "p",
    "text": "Each person answers questions on their own: you, and each of your siblings. Nobody has to make their case in front of the others. You say what you’re already doing, what you can still do, and where your limits are. They do the same."
  },
  {
    "kind": "p",
    "text": "WHEN records what each person reports. It doesn’t check it, and it doesn’t decide who’s right."
  },
  {
    "kind": "h3",
    "text": "Step 2: The Split Sheet"
  },
  {
    "kind": "p",
    "text": "WHEN organizes information reported by family members into a proposed caregiving responsibility matrix and meeting-preparation materials. The output reflects the information provided and is intended for family discussion. It does not guarantee agreement, fairness, compliance with applicable law, or any particular family or financial outcome."
  },
  {
    "kind": "p",
    "text": "In plain words, it’s a proposal. Who might take which tasks, on which days, and who is the backup, all laid out on one page. WHEN can help families document proposed tasks, schedules, expenses, respite arrangements, and backup plans. A proposed responsibility matrix does not itself obligate a family member to provide care or make payments."
  },
  {
    "kind": "h3",
    "text": "Step 3: The Family Meeting"
  },
  {
    "kind": "p",
    "text": "You sit down with the Split Sheet and the meeting-preparation materials in front of everyone. It’s a structured discussion about care responsibilities, with one page everyone can look at instead of a string of texts."
  },
  {
    "kind": "p",
    "text": "When the conversation gets hard, the kit includes three scripts: asking a sibling for money instead of time, saying “I can’t be the only backup anymore,” and reopening the split when care needs jump."
  },
  {
    "kind": "h2",
    "text": "What you approve before anyone sees anything"
  },
  {
    "kind": "p",
    "text": "Before anyone else sees a page, it comes to you. You read the Split Sheet and the meeting-preparation materials first. Nothing goes to your siblings until you approve it."
  },
  {
    "kind": "p",
    "text": "WHEN works from what people report, and what people report can be incomplete or wrong. Reading first gives you the chance to catch that before it reaches the family."
  },
  {
    "kind": "h2",
    "text": "Pricing"
  },
  {
    "kind": "li",
    "text": "Core: free. WHEN’s core offering is free."
  },
  {
    "kind": "li",
    "text": "AI interview: $24.99. Includes five interviews."
  },
  {
    "kind": "li",
    "text": "Human review: $100 or more. Adds human review. A person on our team reads your completed Split Sheet before your family meeting and checks it for gaps — a task with no owner, a backup who was never named, a review date that never got set — and sends it back with notes. Human review is an extra set of eyes on completeness and clarity. It is not legal advice, medical advice, therapy, or mediation, and it does not guarantee agreement or any outcome. Human review is not legal advice and does not guarantee any outcome."
  },
  {
    "kind": "h2",
    "text": "What WHEN is, and what it isn’t"
  },
  {
    "kind": "p",
    "text": "WHEN is an educational coordination and meeting-preparation product. Its outputs are based on information provided by users and may be incomplete or inaccurate. Families should independently verify material facts and obtain qualified professional advice when needed."
  },
  {
    "kind": "p",
    "text": "WHEN provides education and meeting-preparation tools. It does not provide therapy, legal advice, clinical assessment, or professional mediation."
  },
  {
    "kind": "h2",
    "text": "Part 2: The Only Child Test"
  },
  {
    "kind": "p",
    "text": "A one-page checklist for the one doing the care."
  },
  {
    "kind": "p",
    "text": "If you’re the only one doing the care, you’re living like an only child, even if you have siblings. Check every line that’s true right now."
  },
  {
    "kind": "check",
    "text": "1. When the doctor’s office, the pharmacy, or the aide calls, it’s my phone that rings."
  },
  {
    "kind": "check",
    "text": "2. I’m the only person who knows the medication list, the appointment calendar, and where the paperwork lives."
  },
  {
    "kind": "check",
    "text": "3. My siblings have opinions about the care. I have the tasks."
  },
  {
    "kind": "check",
    "text": "4. I’ve changed my work schedule, or skipped something of my own, to cover appointments or emergencies, and no one else has."
  },
  {
    "kind": "check",
    "text": "5. I’ve paid for care-related things out of my own pocket and haven’t asked anyone to chip in."
  },
  {
    "kind": "check",
    "text": "6. If I were sick or out of town next week, no one is named as my backup."
  },
  {
    "kind": "check",
    "text": "7. When I say I’m tired, the answer is “Let me know what you need.”"
  },
  {
    "kind": "check",
    "text": "8. No one has asked what I can’t do anymore. They only ask what our parent needs."
  },
  {
    "kind": "check",
    "text": "9. If you asked who does what, no one could point to a page. It lives in my head."
  },
  {
    "kind": "check",
    "text": "10. I’ve stopped asking for help because I already know how it will go."
  },
  {
    "kind": "p",
    "text": "There’s no score. This isn’t a diagnosis, and it isn’t an assessment of you, your siblings, or your parent. If several of these sound like your week, that’s worth putting on paper."
  },
  {
    "kind": "p",
    "text": "What to do with it. WHEN’s core offering is free. It’s a way to put your answers, and your siblings’ answers, in one place and get ready to talk."
  },
  {
    "kind": "h3",
    "text": "Start with the free core"
  },
  {
    "kind": "p",
    "text": "WHEN provides education and meeting-preparation tools. It does not provide therapy, legal advice, clinical assessment, or professional mediation."
  },
  {
    "kind": "h2",
    "text": "Part 3: Three Hard-Moment Scripts"
  },
  {
    "kind": "p",
    "text": "These are starting points. Change the words until they sound like you, and say them out loud once before the real conversation. They’re conversation prep, not therapy or mediation, and nobody has to say them perfectly."
  },
  {
    "kind": "h2",
    "text": "Script 1: Asking a sibling for money instead of time"
  },
  {
    "kind": "p",
    "text": "When to use it: A sibling lives far away, works long hours, or has already said no to giving time."
  },
  {
    "kind": "p",
    "text": "Before you ask: Pick one specific cost the money would cover, such as a few hours of help each week, a respite break, or a particular bill. “Help” is hard to say yes to. “The Thursday aide” is easier."
  },
  {
    "kind": "p",
    "text": "Say:"
  },
  {
    "kind": "p",
    "text": "“I’m not asking you to be here more. I know that’s not possible right now. I’m asking you to help another way."
  },
  {
    "kind": "p",
    "text": "Right now I’m covering [specific task or cost]. It comes to [amount], and I’ve been paying it myself."
  },
  {
    "kind": "p",
    "text": "Could you take on [amount] a month toward it?”"
  },
  {
    "kind": "p",
    "text": "Then stop talking. Let the silence sit."
  },
  {
    "kind": "p",
    "text": "If they say, “I’d rather help with time.” “I’d be glad of that. Which day can you cover? If we can’t put a day on it, can we put a number on it?”"
  },
  {
    "kind": "p",
    "text": "If they say, “I don’t have much extra.” “Then let’s start smaller. What could you do for three months? We’ll look at it again after that.”"
  },
  {
    "kind": "p",
    "text": "If they say, “I already call every week and give advice.” “That matters to Mom [Dad], and I want you to keep doing it. It doesn’t cover [the task]. This would.”"
  },
  {
    "kind": "p",
    "text": "If they say, “Let me think about it.” “Of course. Can we talk again on [day]? I’d like an answer by then, even if it’s no.”"
  },
  {
    "kind": "p",
    "text": "Write it down. If they agree, put it on the Split Sheet as a proposed expense so it’s in one place. A proposed responsibility matrix does not itself obligate a family member to provide care or make payments, so ask the plain question out loud too: “Can I count on this starting [date]?”"
  },
  {
    "kind": "p",
    "text": "If any of this money would go to you as pay for your caregiving, slow down. Payments to a family caregiver may have employment-tax, income-tax, and reporting consequences. Whether a worker is a household employee and which tax obligations apply depend on the actual working relationship, payment amounts, and applicable exceptions. Families should consult current IRS guidance and qualified tax professionals. Before money changes hands as pay for care, talk with a qualified tax professional and a qualified elder-law attorney."
  },
  {
    "kind": "h2",
    "text": "Script 2: Saying “I can’t be the only backup anymore”"
  },
  {
    "kind": "p",
    "text": "When to use it: You’ve realized that if you’re sick, out of town, or just worn out, there’s no one else."
  },
  {
    "kind": "p",
    "text": "Before you say it: Decide what you’re asking for. A backup is three things: a name, a window of time, and a way to reach them."
  },
  {
    "kind": "p",
    "text": "Say:"
  },
  {
    "kind": "p",
    "text": "“I need to tell you something, and I’m not saying it to blame anyone. I can’t be the only backup anymore."
  },
  {
    "kind": "p",
    "text": "Right now, if I’m sick or away, there’s no one else. That isn’t a plan. It’s just me, hoping nothing happens."
  },
  {
    "kind": "p",
    "text": "I need one more person named as backup. Not forever, and not for everything. Just for [a specific window, such as one weekend a month, or being the second call for the pharmacy and the aide]."
  },
  {
    "kind": "p",
    "text": "Which of those could you take?”"
  },
  {
    "kind": "p",
    "text": "If they say, “You’re so good at it.” “I’m good at it because I’ve had to be. That’s exactly why I need someone else named.”"
  },
  {
    "kind": "p",
    "text": "If they say, “Just call me if you need me.” “I will, and I’d like it written down: a day or a window when you’re the one I call. That way I’m not deciding in the middle of a bad night whether I’m allowed to ask.”"
  },
  {
    "kind": "p",
    "text": "If they say, “I live too far away.” “Then let’s find what far can do. Handling the insurance calls, being the second number the pharmacy has, or helping cover the cost of respite help. Which one fits?”"
  },
  {
    "kind": "p",
    "text": "If they say, “I can’t.” “Okay. I heard that. I still can’t do this alone. Can we set a time this week to work out what is possible?”"
  },
  {
    "kind": "p",
    "text": "Write it down. WHEN can help families document proposed tasks, schedules, expenses, respite arrangements, and backup plans. A backup who is only a promise in a phone call is easy to lose. A backup on the page is easier to keep."
  },
  {
    "kind": "h2",
    "text": "Script 3: Reopening the split when care needs jump"
  },
  {
    "kind": "p",
    "text": "When to use it: After a fall, a hospital stay, a new diagnosis, or anything that makes the old plan stop fitting."
  },
  {
    "kind": "p",
    "text": "Before you say it: Gather what changed, using facts and not blame. What does your parent need now that they didn’t need before? Questions about what level of care your parent needs are for their doctors and care team. WHEN does not provide clinical assessment."
  },
  {
    "kind": "p",
    "text": "Say:"
  },
  {
    "kind": "p",
    "text": "“What we agreed on was built for how things were in [month]. Since [event], things have changed. I’m not saying anyone did anything wrong. I’m saying the plan no longer fits, and I can’t absorb the difference on my own."
  },
  {
    "kind": "p",
    "text": "Can we go back through it, all of us, starting with what each person can do now? I’d like us to answer separately first, the way we did before, and then meet.”"
  },
  {
    "kind": "p",
    "text": "If they say, “We already did this.” “We did, for what Mom [Dad] needed then. This is the same process with new facts.”"
  },
  {
    "kind": "p",
    "text": "If they say, “Can’t we wait and see?” “I’ve been waiting and seeing. I’d like to set a date, [date], to look at it again, so I’m not the one deciding what happens in between.”"
  },
  {
    "kind": "p",
    "text": "If they say, “I can’t do any more than before.” “That might be true. I just need to hear it as an answer, so the plan is built on what’s real and not on guesses.”"
  },
  {
    "kind": "p",
    "text": "After the conversation. Reopening the split means doing the three steps again with new information: Separate Interviews, an updated Split Sheet, and a Family Meeting."
  },
  {
    "kind": "p",
    "text": "WHEN is an educational coordination and meeting-preparation product. Its outputs are based on information provided by users and may be incomplete or inaccurate. Families should independently verify material facts and obtain qualified professional advice when needed."
  },
  {
    "kind": "p",
    "text": "WHEN provides education and meeting-preparation tools. It does not provide therapy, legal advice, clinical assessment, or professional mediation."
  }
];
