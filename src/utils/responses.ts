const cleanObject = (obj: any) => JSON.parse(JSON.stringify(obj));

export const successResponse = (data: any) => {
  // const cleaned = cleanObject(data);

  return {
    success: true,
    message: `Success`,
    code: 200,
    // data: JSON.parse(data),
    data: data,
  };
};

export const errorResponse = (error: any) => {
  console.log("ERRORE", error);
  // const parsedError = JSON.parse(error);
  // const parsedMetadata = JSON.parse(parsedError.metadata.raw);

  return {
    success: false,
    message: `FAILED: ${error.message}`,
    code: error.code,
    data: error,
  };
};
