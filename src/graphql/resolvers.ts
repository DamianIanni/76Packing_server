import axios from "axios";
import { getPackingSuggestions } from "../services/huggingFaceClient";
import { PackingPromptInput } from "../utils/buildPrompt";

export const resolvers = {
  Query: {
    // promptLuggage: async (_: any, { message }: { message: string }) => {
    //   try {
    //     if (!message) throw new Error("Mensaje vacío");
    //     return {
    //       success: true,
    //       message: "Prompt 1 procesado con éxito",
    //       data: `Respuesta IA 1: ${message}`,
    //     };
    //   } catch (error: any) {
    //     return {
    //       success: false,
    //       message: error.message,
    //       data: null,
    //     };
    //   }
    // },
    // promptTranslation: async (
    //   _: any,
    //   args: { text: string; targetLanguage: string }
    // ) => {
    //   try {
    //     const response = await axios.post(
    //       "https://libretranslate.de/translate",
    //       {
    //         q: args.text,
    //         source: "auto",
    //         target: args.targetLanguage,
    //         format: "text",
    //       },
    //       {
    //         headers: { "Content-Type": "application/json" },
    //       }
    //     );

    //     return {
    //       success: true,
    //       message: "Traducción exitosa",
    //       data: response.data.translatedText,
    //     };
    //   } catch (error: any) {
    //     return {
    //       success: false,
    //       message: `Error al traducir ${error}`,
    //       data: null,
    //     };
    //   }
    // },
    suggestPacking: async (
      _: any,
      { prompt }: { prompt: PackingPromptInput }
    ) => {
      try {
        if (!prompt) throw new Error("Prompt is required");

        const response = await getPackingSuggestions(prompt);
        console.log("RESPONSE AI", response);

        return {
          success: true,
          message: "Packing suggestions retrieved successfully",
          data: JSON.stringify(response),
        };
      } catch (error: any) {
        return {
          success: false,
          message: `Failed to fetch suggestions: ${error.message}`,
          data: null,
        };
      }
    },
  },
};
