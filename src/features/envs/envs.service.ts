import { Inject, Injectable } from '@nestjs/common';
import { ENVS } from './constants';
import { Env } from './envs-list';
import { verifyEnvs } from './helpers';

@Injectable()
export class EnvsService {
  envs: Record<Env, string>;

  constructor(@Inject(ENVS) envs: readonly Env[]) {
    const verifiedEnvs = verifyEnvs(envs);

    this.envs = verifiedEnvs;
  }

  /**
   * Returns the env value.
   * Throws error if env not registered in module.
   */
  get(env: Env) {
    if (!(env in this.envs)) {
      throw new Error(`${env} not registered.`);
    }

    return this.envs[env];
  }
}
