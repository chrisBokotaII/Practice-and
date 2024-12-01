import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class loginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(12)
  password: string;
}
