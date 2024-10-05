import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateUserDto } from '../users/create-user.dto';
import { Type } from 'class-transformer';

export class LoginDto {
  /** Почта пользователя */
  @IsNotEmpty()
  @IsString()
  email: string;

  /** Пароль пользователя */
  @IsNotEmpty()
  @IsString()
  password: string;
}
