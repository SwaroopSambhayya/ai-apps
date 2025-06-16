import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "../index.css";
import { Toaster } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/queryClient.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className=" text-foreground   min-h-screen flex flex-col">
        <App />
        <Toaster />
      </div>
    </QueryClientProvider>
  </StrictMode>
);
