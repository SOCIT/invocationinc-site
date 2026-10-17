export function hasMoneyWords(text: string): boolean {
  return (
    /\$/.test(text) ||
    /\b(pay|paid|pays|payment|payments|dollar|dollars|cost|costs|expense|expenses|contribute|contribution|wage|wages|salary|afford|bill|bills|money)\b/i.test(
      text,
    )
  );
}

export function hasRespiteLength(text: string): boolean {
  return (
    /\b(\d+|one|two|three|four|five|six|seven|eight|nine|ten|a|an|few|several)\s+(hour|hours|day|days|night|nights|weekend|weekends|week|weeks|month|months)\b/i.test(
      text,
    ) || /\b(a weekend|each weekend|one weekend|a week|a day|a few hours)\b/i.test(text)
  );
}

export function mentionsHomeChange(text: string): boolean {
  return /\b(assisted living|nursing home|memory care|sell(?:ing)? the (?:house|home)|move(?:s|d)? (?:him|her|them|mom|dad|mother|father|parent) (?:into|to)|moving (?:him|her|them|mom|dad)|into a (?:home|facility)|relocat)/i.test(
    text,
  );
}

export function hasPoa(text: string): boolean {
  const t = text.trim().toLowerCase();
  if (/^(no|nope|nah|none|nobody|no one)\b/.test(t)) return false;
  return (
    /\b(poa|power of attorney|attorney-in-fact|financial agent)\b/.test(t) ||
    /\bagent\b/.test(t)
  );
}

/** What the person reported about capacity. A bare no is not a question raised. */
export function capacityIsQuestioned(text: string): boolean {
  const t = text.trim().toLowerCase();
  if (!t) return false;
  if (/^(no|nope|nah|none)\b/.test(t) && !/\byes\b/.test(t)) return false;
  if (
    /\b(no one|nobody|has not been|hasn't been|not been questioned)\b/.test(t) &&
    !/\byes\b/.test(t)
  ) {
    return false;
  }
  if (/^yes\b/.test(t)) return true;
  if (/\bquestioned\b/.test(t)) return true;
  return false;
}

/**
 * True only when the report says the same person is paid for care and is the
 * sole financial agent. Two different people do not match.
 */
export function paidCaregiverIsSoleFinancialAgent(text: string): boolean {
  const t = text.toLowerCase();
  const samePerson = [
    /paid caregiver is also the sole financial/,
    /paid caregiver is also the only financial/,
    /sole financial (?:poa |power of attorney )?agent is also (?:the )?paid/,
    /only financial agent is also (?:the )?paid/,
    /i am the paid caregiver and (?:i am |also )?the (?:sole|only) financial/,
    /paid for care and (?:is |also )?the (?:sole|only) financial/,
    /the same person[\s\S]{0,40}(?:sole|only) financial/,
    /(?:sole|only) financial[\s\S]{0,60}same person/,
  ];
  return samePerson.some((re) => re.test(t));
}

export function isNearby(text: string): boolean {
  return (
    /\b(nearby|close by|same town|same city|lives with|minutes away|down the street|in town|local)\b/i.test(
      text,
    ) || /\b\d+\s+minutes?\b/i.test(text)
  );
}

export function isDistant(text: string): boolean {
  return /\b(far away|far from|distant|another state|out of state|hours away|across the country|out of town|a flight|flies in)\b/i.test(
    text,
  );
}

export function hasTime(text: string): boolean {
  return /\b(hour|hours|weekday|weekdays|morning|evening|afternoon|available|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i.test(
    text,
  );
}

export function handsOnComfort(text: string): boolean {
  if (
    /\bnot comfortable\b/i.test(text) &&
    !/\b(hands-on|hands on|personal care|bath|meals)\b/i.test(text)
  ) {
    return false;
  }
  return (
    /\b(hands-on|hands on|personal care|bathing|bath|meals|dressing)\b/i.test(
      text,
    ) || /\bcomfortable with\b/i.test(text)
  );
}

export function hasAdminSkill(text: string): boolean {
  return /\b(admin|paperwork|insurance|bills|billing|invoices|phone calls)\b/i.test(
    text,
  );
}

export function hasWeekends(text: string): boolean {
  return /\bweekend/.test(text.toLowerCase());
}

export function reportsIncome(text: string): boolean {
  const t = text.trim().toLowerCase();
  if (!t) return false;
  if (/^(none|nothing|no|nope)\b/.test(t) && !/\$|\d/.test(t)) return false;
  if (/\b(cannot|can't|can not|unable)\b/.test(t) && !/\$|\d/.test(t)) return false;
  return (
    /\$|\b\d+\b/.test(text) ||
    /\b(pay|paid|contribute|contribution|cover|chip in)\b/i.test(text)
  );
}
