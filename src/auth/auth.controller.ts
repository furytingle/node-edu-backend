import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    const accessToken = await this.authService.signUpUser(signUpDto);
    return { accessToken };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const accessToken = await this.authService.loginUser(loginDto);
    return { accessToken };
  }
}
