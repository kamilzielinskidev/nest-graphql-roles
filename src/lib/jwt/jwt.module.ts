import { Module } from '@nestjs/common';
import { EnvsModule } from '../../features/envs/envs.module';
import { JwtService } from './jwt.service';

@Module({
  imports: [EnvsModule.forEnvs(['JWT_SECRET'])],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
