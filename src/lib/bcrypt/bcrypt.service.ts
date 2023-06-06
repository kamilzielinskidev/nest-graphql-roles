import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  hash(value: string) {
    return bcrypt.hashSync(value, 10);
  }

  compare(value: string, hashed: string) {
    return bcrypt.compareSync(value, hashed);
  }
}
