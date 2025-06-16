/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENAI_KEY: string;
  // add other env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
