declare global {
  namespace Express {
    interface Request {
      user?: {          // JWT payload flow
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