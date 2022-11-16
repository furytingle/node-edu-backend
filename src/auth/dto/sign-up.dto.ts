import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';
import { Match } from '../../utility/validators/match.decorator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  password: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  @Match('password')
  passwordConfirmation: string;
}
