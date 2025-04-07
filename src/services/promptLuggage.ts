import axios from "axios";
import { buildPackingPrompt, PackingPromptInput } from "../utils/buildPrompt";
import { responseBuilder } from "../utils/buildResponse";

const MODEL_URL = "https://openrouter.ai/api/v1/chat/completions";
const AI_MODEL = "mistralai/mistral-7b-instruct:free";

// promptLuggage.ts
export async function promptLuggage(data: PackingPromptInput) {
  const OR_API_KEY = process.env.OR_API_KEY;
  if (!OR_API_KEY) throw new Error("API Key no encontrada.");

  const prompt = buildPackingPrompt(data);

  const response = await axios.post(
    MODEL_URL,
    {
      model: AI_MODEL,
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${OR_API_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: 20000,
    }
  );

  const output = responseBuilder(response.data.choices?.[0]?.message?.content);
  if (!output) throw new Error("Respuesta vacía de la IA");

  return output;
}
