import { G } from '@mobily/ts-belt';

/**
 * Verifies env variables and returns its values.
 * Throws error if any env is not present.
 */
export const verifyEnvs = <A extends string>(envs: readonly A[]) => {
  const pairs = envs.map((env: A) => {
    const envVar = process.env[env];

    if (G.isNullable(envVar)) {
      throw new Error(`Could not load ${env}`);
    }

    return [env, envVar] as const;
  });

  // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter, @typescript-eslint/consistent-type-assertions
  return pairs.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as Record<A, string>);
};
