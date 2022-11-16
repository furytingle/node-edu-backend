import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HashService } from './hash.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async signUpUser(signUpDTO: SignUpDto): Promise<string> {
    const { email, password } = signUpDTO;
    const userExists = await this.findUserByEmail(email);

    if (!userExists) {
      const user = new User();
      user.email = email;
      user.password = await this.hashService.makeHash(password);
      await this.userRepository.save(user);

      return this.jwtService.sign({ email: user.email });
    } else {
      throw new HttpException('Email already exists', HttpStatus.FORBIDDEN);
    }
  }

  async loginUser(loginDto: LoginDto): Promise<string> {
    const { email, password } = loginDto;
    const user = await this.findUserByEmail(email);

    if (user) {
      const passwordIsValid = await this.hashService.matchPassword(
        password,
        user.password,
      );

      if (passwordIsValid) {
        return this.jwtService.sign({ email: user.email });
      } else {
        throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
      }
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.FORBIDDEN);
    }
  }

  private async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }
}
