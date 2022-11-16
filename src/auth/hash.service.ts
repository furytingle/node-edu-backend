import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  public async makeHash(data: string): Promise<string> {
    const salt = 10;
    return await bcrypt.hash(data, salt);
  }

  public matchPassword(data: string, hashedData: string): number {
    return bcrypt.compare(data, hashedData);
  }
}
