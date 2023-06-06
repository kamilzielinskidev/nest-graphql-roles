import { Module } from '@nestjs/common';
import { PrismaService } from 'lib/prisma/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
