export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PORT: number;
      MONGODB_URL: string;
    }
  }
}
