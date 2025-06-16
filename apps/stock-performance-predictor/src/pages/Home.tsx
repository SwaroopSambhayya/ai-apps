import Header from "../components/Header";
import { PlusIcon, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { fetchPolygonData } from "@/api/polygon";
import ReactMarkdown from "react-markdown";
import { Button, Skeleton, Card, Badge } from "@repo/ui";

export default function Home() {
  const [stockTickers, setStockTickers] = useState<string[]>([]);
  const currentTickerRef = useRef<HTMLInputElement>(null);
  const {
    isFetching,
    refetch,
    data: reportData,
  } = useQuery({
    queryKey: ["stockTickers"],
    queryFn: async () => fetchPolygonData(stockTickers),
    enabled: false,
    retry: false,
  });
  const addTicker = (
    e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent | undefined
  ) => {
    if (
      !currentTickerRef?.current ||
      (e?.type === "keydown" &&
        (e as React.KeyboardEvent<HTMLInputElement>).code.toLowerCase() !==
          "enter")
    )
      return;
    const ticker = currentTickerRef.current?.value.trim().toUpperCase();
    if (ticker && !stockTickers.includes(ticker)) {
      setStockTickers([...stockTickers, ticker]);
      currentTickerRef.current.value = "";
    } else {
      toast.error("Invalid or duplicate stock ticker", {
        duration: 3000,
        position: "top-center",
      });
    }
  };

  const removeChip = (ticker: string) => {
    setStockTickers(stockTickers.filter((t) => t !== ticker));
  };

  const showLimitToast = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (stockTickers.length >= 3) {
      if (
        (e.type === "keydown" &&
          (e as React.KeyboardEvent<HTMLInputElement>).code.toLowerCase() ===
            "enter") ||
        e.type === "click"
      ) {
        toast.error("You can only add up to 3 stock tickers", {
          duration: 3000,
          position: "top-center",
        });
      }
    }
  };
  return (
    <div className="layout-container flex flex-col h-full grow">
      <Header />
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] w-full">
          <h2 className="text-white text-[28px] font-bold text-center pt-5 pb-3">
            Generate Stock Report
          </h2>
          <div className="flex  flex-wrap items-end  gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium pb-2">
                Stock Ticker
              </p>
              <div className="relative flex items-center">
                <div className=" w-full" onClick={showLimitToast}>
                  <input
                    ref={currentTickerRef}
                    placeholder="Enter upto 3 stock ticker"
                    onKeyDown={
                      stockTickers.length >= 3 ? showLimitToast : addTicker
                    }
                    className="form-input w-full rounded-xl text-white border border-[#4d4d4d] bg-neutral-800 h-14 p-[15px] text-base placeholder:text-[#adadad]"
                  ></input>
                </div>
                <Button
                  className="h-14 w-14 absolute right-0"
                  onClick={addTicker}
                  disabled={stockTickers.length >= 3}
                >
                  <PlusIcon />
                </Button>
              </div>
            </label>
          </div>
          <div className="flex justify-center  flex-col px-4 py-3">
            <div className="flex flex-wrap gap-2 m-2 h-16 mb-5">
              {stockTickers.map((ticker) => (
                <Badge
                  className=" h-8"
                  key={ticker}
                  onClick={() => removeChip(ticker)}
                >
                  {ticker}

                  <X className="cursor-pointer" />
                </Badge>
              ))}
            </div>
            <Button
              disabled={isFetching || stockTickers.length === 0}
              className="flex min-w-1/4 self-center"
              onClick={() => refetch()}
            >
              <span className="truncate">Generate Report</span>
            </Button>
          </div>
          {isFetching && <Skeleton className=" w-full h-full" />}
          {!isFetching && reportData && (
            <Card className="w-full h-full p-5 mt-5">
              <ReactMarkdown>{reportData}</ReactMarkdown>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
