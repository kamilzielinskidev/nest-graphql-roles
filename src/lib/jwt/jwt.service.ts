import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { EnvsService } from '../../features/envs/envs.service';

@Injectable()
export class JwtService {
  constructor(private readonly envsService: EnvsService) {}

  sign<T extends object>(payload: T) {
    return jwt.sign(payload, this.envsService.get('JWT_SECRET'));
  }
}
