interface item {
  quantity: number;
  item: string;
}

export const responseBuilder = (rawResponse: string) => {
  let parsed;
  try {
    parsed = JSON.parse(rawResponse);
  } catch (e) {
    console.error("Failed to parse AI response as JSON:", e);
    return [];
  }

  // If the response is an array of luggage objects with items
  if (
    Array.isArray(parsed) &&
    parsed.every((l) => l.items && Array.isArray(l.items))
  ) {
    const parsedLuggages = parsed.map((luggage) =>
      luggage.items.map((item: item) => ({
        quantity: item.quantity,
        item: item.item,
      }))
    );
    // console.log("PARSED LUGGAGES", parsedLuggages);
    return parsedLuggages;
  }

  console.warn("Unexpected format in AI response:", parsed);
  return [];
};
