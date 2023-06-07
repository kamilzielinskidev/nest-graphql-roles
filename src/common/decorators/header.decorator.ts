import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { getContextHeader } from 'lib/graphql-nest-integration/getContextHeader';

export const Header = createParamDecorator((header: string, context: ExecutionContext) => {
  return getContextHeader(context)(header);
});
