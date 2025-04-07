export const responseBuilder = (rawResponse: string) => {
  // Split the response into sections by luggage using the pattern '--- Luggage 1 ---', '--- Luggage 2 ---', etc.
  // \s* allows for optional whitespace, \d+ matches the luggage number, and 'i' makes it case-insensitive
  const luggageSections = rawResponse
    .split(/---\s*Luggage\s*\d+\s*---/i)
    .map((section) => section.trim())
    .filter(Boolean); // Remove empty strings

  const parsedLuggages = luggageSections.map((section) => {
    const lines = section
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("-") || /^\d+ x/.test(line));

    // Keep only lines that start with '-' or match the pattern 'number x item', e.g., '2 x hiking shoes'
    // ^\d+ x matches lines that begin with one or more digits followed by ' x'

    return lines.map((itemLine) => {
      // Match and extract the quantity and item description from lines like '- 2 x hiking shoes'
      // ^-? optionally matches a leading '-', \s* allows spaces, (\d+) captures quantity, \s*x\s* matches 'x' with optional spaces, (.+) captures the item
      const match = itemLine.match(/^-?\s*(\d+)\s*x\s*(.+)/i);
      if (match) {
        return {
          quantity: Number(match[1]),
          item: match[2],
        };
      }
      return { quantity: 1, item: itemLine.replace(/^-/, "").trim() };
    });
  });
  console.log("PARSED LUGGAGES", parsedLuggages);

  return parsedLuggages;
};
