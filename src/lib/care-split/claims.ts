// Gate-corrected claims from issue #4 comment 2.
// Use these sentences verbatim wherever the corresponding claim appears.
// The research paragraph is the rule against unsourced statistics.
// It is not displayed: this product publishes no caregiving statistic.

export const CLAIMS = {
  "product": [
    "The Care Split helps families organize caregiving concerns, document each participant's reported availability and limits, and prepare for a structured family discussion about care responsibilities.",
    "The Care Split provides education and meeting-preparation tools. It does not provide therapy, legal advice, clinical assessment, or professional mediation."
  ],
  "produces": [
    "The Care Split organizes information reported by family members into a proposed caregiving responsibility matrix and meeting-preparation materials. The output reflects the information provided and is intended for family discussion. It does not guarantee agreement, fairness, compliance with applicable law, or any particular family or financial outcome."
  ],
  "pca": [
    "The Care Split may provide an educational Personal Care Agreement preparation worksheet for attorney review. The worksheet is not a substitute for an agreement drafted or reviewed by a qualified attorney. Requirements and consequences depend on applicable law and individual circumstances.",
    "ATTORNEY REVIEW REQUIRED BEFORE SIGNING OR MAKING PAYMENTS."
  ],
  "benefits": [
    "Medicaid eligibility, transfer penalties, and Personal Care Agreement treatment depend on applicable federal and state law and the individual's circumstances. The Care Split does not determine Medicaid eligibility, guarantee acceptance of an agreement, or guarantee avoidance of a transfer penalty.",
    "VA pension and related benefit eligibility depend on applicable VA rules and the claimant's individual circumstances. The Care Split does not determine eligibility or guarantee benefit approval."
  ],
  "tax": [
    "Payments to a family caregiver may have employment-tax, income-tax, and reporting consequences. Whether a worker is a household employee and which tax obligations apply depend on the actual working relationship, payment amounts, and applicable exceptions. Families should consult current IRS guidance and qualified tax professionals."
  ],
  "research": [
    "Any published caregiving statistic will identify its source, publication date, population, and relevant definition. Any commercial-care cost comparison will identify the source year, geographic scope, type of service, and calculation assumptions. Estimates will not be presented as guaranteed savings or as the financial result of using The Care Split."
  ],
  "pricing": [
    "The Care Split's core offering is free. The AI interview tier costs $24.99 and includes five interviews. A tier priced at $100 or more adds human review. The scope of human review will be described accurately and will not be represented as legal advice or a guarantee of any outcome unless the service is separately and appropriately established for that purpose."
  ],
  "commitments": [
    "The Care Split can help families document proposed tasks, schedules, expenses, respite arrangements, and backup plans. A proposed responsibility matrix does not itself obligate a family member to provide care or make payments."
  ],
  "limits": [
    "The Care Split is an educational coordination and meeting-preparation product. Its outputs are based on information provided by users and may be incomplete or inaccurate. Families should independently verify material facts and obtain qualified professional advice when needed."
  ]
} as const;

export const ATTORNEY_NOTICE_TITLE =
  "ATTORNEY REVIEW REQUIRED BEFORE SIGNING OR MAKING PAYMENTS";

export const ATTORNEY_NOTICE_BODY = "This educational worksheet is for family discussion and preparation only. It is not a legal document prepared or reviewed by an attorney, tax advice, or a determination of Medicaid or VA benefit eligibility. Personal Care Agreement requirements depend on applicable law and individual circumstances. Have a qualified elder-law attorney review the agreement, the parent's decision-making authority, compensation terms, and potential benefit or tax consequences before signing or making payments.";

export const HUMAN_REVIEW_SCOPE = "A person on our team reads your completed Split Sheet before your family meeting and checks it for gaps — a task with no owner, a backup who was never named, a review date that never got set — and sends it back with notes. Human review is an extra set of eyes on completeness and clarity. It is not legal advice, medical advice, therapy, or mediation, and it does not guarantee agreement or any outcome.";

export const SUGGESTED_CHECK_INS =
  "Suggested check-ins: look again in 30 days, 60 days, and 90 days. Also suggested: an immediate re-check after any fall, ER visit, or hospitalization. This is a suggested schedule for the family discussion. It is not a legal requirement.";
