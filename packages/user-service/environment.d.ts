export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PORT: number;
      JWT_SECRET: string;
      MONGODB_URL: string;
    }
  }
}
