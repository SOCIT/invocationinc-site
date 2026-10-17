export type PhraseInput = {
  questionId: string;
  canonicalPrompt: string;
};

/**
 * Isolated hook for model-generated question phrasing.
 * The fixed prompt is the product. This returns it unchanged.
 * This repo has no AI provider. To turn phrasing on, replace the body
 * with a call to a server route that uses the house model.
 * Do not put API keys in this file.
 */
export async function phraseQuestion(input: PhraseInput): Promise<string> {
  return input.canonicalPrompt;
}
