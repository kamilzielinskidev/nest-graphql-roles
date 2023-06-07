const validAuthorizationHeaderPattern = /Bearer \w.*/;

/**
 * This functions parses authorization header value.
 * It returns parsed token.
 * Throws error if header value is not valid.
 */
export const parseAuthorizationHeader = (authorizationHeaderValue: string) => {
  if (!validAuthorizationHeaderPattern.test(authorizationHeaderValue)) {
    throw new Error('Invalid header value.');
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const token = authorizationHeaderValue.split(' ').at(1)!; // asserted by regex pattern

  return token;
};
