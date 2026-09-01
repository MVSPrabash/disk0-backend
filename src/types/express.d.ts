declare global {
  namespace Express {
    interface Request {
      user?: {          // Authentication payload
        id: string;
      };
      validated?: {
        body?: unknown;
        params?: unknown;
        query?: unknown;
      };
    }
  }
}

export {};