export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      QUEUE_URL: string;
      AWS_REGION: string;
    }
  }
}
