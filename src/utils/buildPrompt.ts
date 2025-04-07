export interface PackingPromptInput {
  destination: string;
  duration: number;
  activities: string;
  luggageItems: string[];
  weatherSensitivity?: string;
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
  return `You are an expert travel assistant. Based on and USE ONLY the following travel information, provide a detailed list of clothing to pack inside the provided luggage. Avoid all explanations, just list the items and include quantities.

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

Please return a separate, flat list of items (with quantities) to pack for each luggage. Avoid categorizing. Use the following format:

--- Luggage 1 ---
- 5 x white t-shirts
- 2 x dress shirts
- 3 x jeans
- 2 x shorts
- 7 x underwear
- 7 x socks
- 1 x jacket
- 1 x sneakers
- 1 x sandals
- 1 x travel adapter

--- Luggage 2 ---
(if applicable, continue in same format)
`;
}
