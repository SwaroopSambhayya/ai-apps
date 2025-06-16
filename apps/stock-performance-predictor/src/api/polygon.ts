import { getDaysBeforeDate } from "@/utils";
import axios from "axios";
import { analyzeStockData } from "./openAI";

const daysBefore = 5;

const fetchTickerData = async (ticker: string) => {
  const currentDate = new Date(Date.now());
  const currentFormattedDate = getDaysBeforeDate(new Date(Date.now()), 0);
  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${getDaysBeforeDate(
    currentDate,
    daysBefore
  )}/${currentFormattedDate}`;
  const response = await axios.get(url, {
    params: {
      apiKey: import.meta.env.VITE_POLYGON_API_KEY,
    },
  });
  return response?.data;
};

export const fetchPolygonData = async (tickers: string[]) => {
  const results = await Promise.allSettled(
    tickers.map((ticker) => fetchTickerData(ticker))
  );
  const stockData = results.map((result, index) => {
    if (result.status === "fulfilled") {
      return { ticker: tickers[index], data: result.value };
    } else {
      throw new Error(
        `Failed to fetch data for ${tickers[index]}: ${result.reason.message}`
      );
    }
  });
  try {
    const report = await analyzeStockData(stockData);
    return report;
  } catch (error) {
    console.error("Error analyzing stock data:", error);
    throw new Error("Failed to analyze stock data");
  }
};
