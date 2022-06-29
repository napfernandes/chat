export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PORT: number;
      MONGODB_URL: string;
      JWT_SECRET: string;
      QUEUE_URL: string;
      PUBSUB_URL: string;
      AWS_REGION: string;
    }
  }
}
