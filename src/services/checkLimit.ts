import axios from "axios";

export const checkLimit = async (): Promise<
  | { success: true; usage: number; limit: number | null }
  | { success: false; message: string }
> => {
  try {
    const { data } = await axios.get("https://openrouter.ai/api/v1/auth/key", {
      headers: {
        Authorization: `Bearer ${process.env.OR_API_KEY}`,
      },
    });

    const usage = data?.data?.usage;
    const limit = data?.data?.limit;

    if (limit !== null && usage >= 190) {
      console.warn(`API usage is near limit: ${usage}/${limit}`);
      return {
        success: false,
        message: "API usage limit reached. Please try again later.",
      };
    }

    // console.log("API KEY USAGE LIMITS", usage, limit, data);

    return {
      success: true,
      usage,
      limit,
    };
  } catch (error: any) {
    console.error(
      "Error checking API usage:",
      error.response?.data || error.message
    );
    return {
      success: false,
      message: "Failed to verify API usage limit",
    };
  }
};
