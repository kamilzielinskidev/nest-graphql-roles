import { G } from '@mobily/ts-belt';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class ZodValidationPipe<T extends z.ZodTypeAny> implements PipeTransform {
  constructor(private readonly schema: T) {}

  transform(value: unknown) {
    const parse = this.schema.safeParse(value);

    if (!parse.success) {
      const issue = parse.error.issues.at(0);

      if (G.isNullable(issue)) {
        throw new BadRequestException('Unknown error');
      }

      const path = issue.path.at(0);
      const message = issue.message;

      if (G.isNullable(path)) {
        throw new BadRequestException('Unknown error');
      }

      throw new BadRequestException(`${path}: ${message}`);
    }

    return value;
  }
}
