// src/lib/queryClient.js
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      // 🎉 only show error toasts if we already have data in the cache
      // which indicates a failed background update
      toast.error(`Something went wrong: ${error.message}`);
    },
  }),

  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60, // 1 minute
    },
  },
});

export default queryClient;
