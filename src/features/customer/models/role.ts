export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
}

export const from = (v: string) => {
  switch (v) {
    case 'USER':
      return Role.USER;
    case 'ADMIN':
      return Role.ADMIN;
    default:
      return Role.UNAUTHENTICATED;
  }
};
