import { DynamicModule, Module } from '@nestjs/common';
import { EnvsService } from './envs.service';

import { ENVS } from './constants';
import { Env } from './envs-list';

@Module({})
export class EnvsModule {
  static forEnvs(envs: readonly Env[]): DynamicModule {
    return {
      module: EnvsModule,
      providers: [{ provide: ENVS, useValue: envs }, EnvsService],
      exports: [EnvsService],
    };
  }
}
