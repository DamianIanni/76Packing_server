// src/services/huggingFaceClient.ts
import axios from "axios";
import { buildPackingPrompt, PackingPromptInput } from "../utils/buildPrompt";

const MODEL_URL =
  "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1";

export async function getPackingSuggestions(data: PackingPromptInput) {
  const HF_API_KEY = process.env.HF_API_KEY;

  if (!HF_API_KEY) {
    console.error("❌ HF_API_KEY no está definida.");
    return "Error interno del servidor: API Key no encontrada.";
  }
  const prompt = buildPackingPrompt(data);

  try {
    const response = await axios.post(
      MODEL_URL,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 20000, // 20 segundos por si el modelo tarda un poco
      }
    );

    const output = response.data?.[0]?.generated_text || "No response";
    // console.log("Response en el cliente:", JSON.stringify(output));

    return {
      success: true,
      message: "Suggestions generated successfully",
      data: output,
    };
  } catch (error: any) {
    console.error("HuggingFace error:", error.message);
    return {
      success: false,
      message: "Failed to get suggestions",
      data: null,
    };
  }
}
