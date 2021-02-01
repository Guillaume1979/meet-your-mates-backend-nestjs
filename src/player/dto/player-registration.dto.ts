import { IsEmail, IsNotEmpty } from 'class-validator';

export class PlayerRegistrationDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
