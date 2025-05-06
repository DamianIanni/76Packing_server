export interface PackingPromptInput {
  destination: string;
  duration: number;
  activities?: string;
  luggageItems: string[];
  weatherSensitivity?: string;
  favoriteClothing?: string;
  accommodationType?: string;
  utilities?: string;
  gender?: string;
  height?: string;
  nationality?: string;
  age: number;
  dressStyle?: string;
}

export function buildPackingPrompt(input: PackingPromptInput): string {
  return `You are an expert travel assistant. Based only on the following travel information, generate a realistic and efficient packing list. Return only the items with quantities in a structured JSON format. Avoid any explanation. Do not return an empty list.

Destination: ${input.destination}
Trip duration (in days): ${input.duration}
Planned activities: ${input.activities || "None"}}
Luggage details: ${
    input.luggageItems && input.luggageItems.length > 0
      ? input.luggageItems
          .map((item, index) => `${index + 1}) ${item}`)
          .join("; ")
      : "1 standard suitcase (details unspecified)"
  }
Weather sensitivity: ${input.weatherSensitivity || "None"}
Favorite clothing items: ${input.favoriteClothing || "None"}
Accommodation type: ${input.accommodationType || "None"}}
Available utilities: ${input.utilities || "None"}
Gender: ${input.gender || "None"}}
Height: ${input.height || "None"}}
Nationality: ${input.nationality || "None"}}
Age: ${input.age}
Dress style: ${input.dressStyle || "None"}

Important rules:
- Only include clothing, underwear, and footwear. Do not include electronics, documents, or accessories like phones, passports, wallets, sunglasses, headphones, or similar items.
- Ensure that each clothing item is only included once across all luggages unless multiple quantities are justified.
- Add 3 more of each piece of underware and socks that you put in the luggage.
- Always include essential clothing and undergarments.
- Consider the capacity of each luggage when deciding quantities.
- Do not return empty arrays or omit key clothing items.
- Avoid item names with parentheses or descriptive notes.
- Avoid repeated or unnecessary items.
- Do not include accessories or toiletries.
- Use short and simple item names like “t-shirt”, “jeans”, or “hiking shoes”.
- Only include colors for favorite items if provided.
- Only return the requested JSON 

Response format:
A JSON array of objects, where each object represents one luggage. Each object must have two keys: "luggage" (a string with the luggage name) and "content" (an array of items). Each item is an object with this format: { "quantity": number, "item": string }
`;
}
