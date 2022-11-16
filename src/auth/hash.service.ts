import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  public async makeHash(data: string): Promise<string> {
    const salt = 10;
    return await bcrypt.hash(data, salt);
  }

  public async matchPassword(
    password: string,
    passwordHash: string,
  ): Promise<any> {
    return bcrypt.compare(password, passwordHash);
  }
}
