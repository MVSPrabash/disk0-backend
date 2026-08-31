import { Request } from 'express';

type ValidatedRequest<TBody = unknown, TParams = unknown, TQuery = unknown> =
  Request & {
    validated: {
      body: TBody;
      params: TParams;
      query: TQuery;
    };
  };

export default ValidatedRequest;