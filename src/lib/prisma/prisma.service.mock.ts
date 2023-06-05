import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaServiceMock extends PrismaClient implements OnModuleInit {
  async onModuleInit() {}

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', () => {});
  }
}
