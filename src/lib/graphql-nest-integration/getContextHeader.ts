import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const getContextHeader = (context: ExecutionContext) => (header: string) => {
  return context.getArgByIndex<{ req: Request }>(2).req.header(header);
};
