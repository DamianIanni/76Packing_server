// src/utils/buildPrompt.ts
export interface PackingPromptInput {
  destination: string;
  duration: number;
  activities: string;
  luggageItems: string[];
  weatherSensitivity: string;
  favoriteClothing?: string;
  accommodationType: string;
  utilities?: string;
  gender: string;
  height: string;
  nationality: string;
  age: number;
  dressStyle: string;
}

export function buildPackingPrompt(input: PackingPromptInput): string {
  return `You are an expert travel assistant. Based on the following travel information, provide a detailed list of clothing and items to pack inside the provided luggage. Avoid explanations, just list the items by category, and include quantities.

Destination: ${input.destination}
Trip duration (in days): ${input.duration}
Planned activities: ${input.activities}
Luggage details: ${
    input.luggageItems && input.luggageItems.length > 0
      ? input.luggageItems
          .map((item, index) => `${index + 1}) ${item}`)
          .join("; ")
      : "1 standard suitcase (details unspecified)"
  }
Weather sensitivity (e.g., sensitive to cold, heat, humidity) (optional): ${
    input.weatherSensitivity || "None"
  }
Favorite clothing items (optional): ${input.favoriteClothing || "None"}
Accommodation type: ${input.accommodationType}
Available utilities (e.g., washing machine, dryer) (optional): ${
    input.utilities || "None"
  }
Gender: ${input.gender}
Height: ${input.height}
Nationality: ${input.nationality}
Age: ${input.age}
Dress style (optional): ${input.dressStyle || "None"}

Please organize the list under clear categories such as:
- Tops (t-shirts, shirts, etc.)
- Bottoms (pants, shorts, etc.)
- Underwear and socks
- Outerwear
- Footwear`;
}
