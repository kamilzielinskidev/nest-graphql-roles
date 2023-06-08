import { Module } from '@nestjs/common';
import { BcryptModule } from 'lib/bcrypt/bcrypt.module';
import { JwtModule } from 'lib/jwt/jwt.module';
import { PrismaModule } from 'lib/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PrismaModule, BcryptModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
