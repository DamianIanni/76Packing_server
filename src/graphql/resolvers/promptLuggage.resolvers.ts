import { promptLuggage } from "../../services/promptServices/promptLuggage";
import { PackingPromptInput } from "../../utils/buildPrompt";
import { checkLimit } from "../../services/promptServices/checkLimit";
import { successResponse, errorResponse } from "../../utils/responses";

export const promptLuggage_resolver = {
  promptLuggage: async (_: any, { prompt }: { prompt: PackingPromptInput }) => {
    try {
      if (!prompt) throw new Error("Prompt is required");

      const hasLimit = await checkLimit();

      if (!hasLimit.success) return hasLimit.message;

      const response = await promptLuggage(prompt);
      return successResponse(response);
    } catch (error: any) {
      return errorResponse(error);
    }
  },
};
