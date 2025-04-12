export const successPropmtResponse = (data: any) => ({
  success: true,
  message: "Packing suggestions retrieved successfully",
  code: 200,
  // data: JSON.parse(data),
  data: data,
});

export const errorPropmtResponse = (error: any) => {
  console.log("ERRORE", error);
  // const parsedError = JSON.parse(error);
  // const parsedMetadata = JSON.parse(parsedError.metadata.raw);
  // console.log("ERRORE 33", parsedError);

  return {
    success: false,
    message: `Failed to fetch suggestions: ${error.message}`,
    code: error.code,
    data: null,
  };
};
