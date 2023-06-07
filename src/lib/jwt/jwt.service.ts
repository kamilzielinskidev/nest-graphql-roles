import { Injectable } from '@nestjs/common';
import { EnvsService } from '../../features/envs/envs.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');

@Injectable()
export class JwtService {
  constructor(private readonly envsService: EnvsService) {}

  sign<T extends object>(payload: T) {
    return jwt.sign(payload, this.envsService.get('JWT_SECRET'));
  }
}
