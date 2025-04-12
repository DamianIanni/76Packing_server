import { promptLuggage } from "../services/promptLuggage";
import { PackingPromptInput } from "../utils/buildPrompt";
import { checkLimit } from "../services/checkLimit";
import { successPropmtResponse, errorPropmtResponse } from "../utils/responses";

export const resolvers = {
  Query: {
    promptLuggage: async (
      _: any,
      { prompt }: { prompt: PackingPromptInput }
    ) => {
      try {
        if (!prompt) throw new Error("Prompt is required");

        const hasLimit = await checkLimit();

        if (!hasLimit.success) return hasLimit.message;

        const response = await promptLuggage(prompt);
        return successPropmtResponse(response);
      } catch (error: any) {
        return errorPropmtResponse(error);
      }
    },
  },
};
