import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  /** Роль/Должность пользователя */
  @IsNotEmpty()
  @IsString()
  role: string;

  /** Имя пользователя */
  @IsNotEmpty()
  @IsString()
  name: string;

  /** Почта пользователя */
  @IsNotEmpty()
  @IsString()
  email: string;

  /** Пароль пользователя */
  @IsNotEmpty()
  @IsString()
  password: string;

  /** ID аккаунта */
  @IsOptional()
  @IsNumber()
  accountId?: number;
}
