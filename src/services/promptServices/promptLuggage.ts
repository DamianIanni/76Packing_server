import axios from "axios";
import {
  buildPackingPrompt,
  PackingPromptInput,
} from "../../utils/buildPrompt";
// import { responseBuilder } from "../utils/buildResponse";

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

  const messageContent = response.data.choices?.[0]?.message?.content;
  const a = JSON.parse(messageContent);
  console.log("PARSEaDO", a);

  // console.log("AI RAW MESSAGE:", response.data.error);
  // const output = responseBuilder(messageContent);
  if (!messageContent) {
    const error = {
      message: response.data?.error?.message || "Error desconocido",
      code: response.data?.error?.code || 500,
      data: response.data?.error.metadata || {},
    };
    throw error;
  }

  return messageContent;
}
