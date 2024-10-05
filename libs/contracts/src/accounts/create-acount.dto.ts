import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateUserDto } from '../users/create-user.dto';
import { Type } from 'class-transformer';

export class CreateAccountDto {
  /** Название аккаунта */
  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}
