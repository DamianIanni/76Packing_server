export const successPropmtResponse = (data: any) => ({
  success: true,
  message: "Packing suggestions retrieved successfully",
  // data: JSON.stringify(data),
  data: data,
});

export const errorPropmtResponse = (message: string) => ({
  success: false,
  message: `Failed to fetch suggestions: ${message}`,
  data: null,
});
