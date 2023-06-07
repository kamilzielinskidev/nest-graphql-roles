import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { EnvsService } from 'features/envs/envs.service';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class JwtService {
  constructor(private readonly envsService: EnvsService) {}

  sign(payload: JwtPayload) {
    return jwt.sign(payload, this.envsService.get('JWT_SECRET'));
  }

  validate(token: string) {
    return jwt.verify(token, this.envsService.get('JWT_SECRET')) as JwtPayload;
  }

  decode(token: string) {
    return jwt.decode(token) as JwtPayload;
  }
}
