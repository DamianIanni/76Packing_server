export const successResponse = (data: any) => ({
  success: true,
  message: `Success`,
  code: 200,
  // data: JSON.parse(data),
  data: JSON.stringify(data),
});

export const errorResponse = (error: any) => {
  console.log("ERRORE", error);
  // const parsedError = JSON.parse(error);
  // const parsedMetadata = JSON.parse(parsedError.metadata.raw);
  // console.log("ERRORE 33", parsedError);

  return {
    success: false,
    message: `FAILED: ${error.message}`,
    code: error.code,
    data: null,
  };
};
