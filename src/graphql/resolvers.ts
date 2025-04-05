export const resolvers = {
  Query: {
    prompt1: async (_: any, { message }: { message: string }) => {
      try {
        if (!message) throw new Error("Mensaje vacío");
        return {
          success: true,
          message: "Prompt 1 procesado con éxito",
          data: `Respuesta IA 1: ${message}`,
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.message,
          data: null,
        };
      }
    },
    prompt2: async (_: any, { message }: { message: string }) => {
      try {
        if (!message) throw new Error("Mensaje vacío");
        return {
          success: true,
          message: "Prompt 2 procesado con éxito",
          data: `Respuesta IA 2: ${message}`,
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.message,
          data: null,
        };
      }
    },
  },
};
