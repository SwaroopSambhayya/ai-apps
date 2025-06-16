import OpenAI from "openai";

export const openAI = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_KEY,
  dangerouslyAllowBrowser: true, // This is necessary for browser environments
});

export const analyzeStockData = async (stockData: object) => {
  try {
    const response = await openAI.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert stock market analyst. Analyze the provided stock data and suggest whether to buy, sell, or hold each stock based on the trends and patterns observed. Explain it in a concise manner.",
        },
        {
          role: "user",
          content: `\n${JSON.stringify(stockData, null, 2)}`,
        },
      ],
    });
    console.log("OpenAI response:", response);
    return response.choices?.[0]?.message?.content ?? "No content available";
  } catch (error) {
    console.error("Error analyzing stock data:", error);
    throw error;
  }
};
