import { Prisma } from '@prisma/client';

export const customers: ReadonlyArray<Prisma.CustomerUpsertArgs['create']> = [
  {
    id: '9e391faf-64b2-4d4c-b879-463532920fd3',
    email: 'adminadmin12@admin.com',
    password: '$2a$10$UmrdtT1E0WfZF.OM.r1ezO/Jt4pPNu.3ChZ9wKT9w9OPwllaikHOa',
    role: 'ADMIN',
  },
  {
    id: '9e391faf-64b2-4d4c-b879-463532920fd4',
    email: 'user@gmail.com',
    password: '$2a$10$5CJRQm5zMlcUBKIKrIz0UuN0ItHBsapdv7/1/2Dj0LIe4il5/xg3.',
    role: 'USER',
  },
];
