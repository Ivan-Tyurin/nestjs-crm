import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDto } from '../users/create-user.dto';
import { CreatePipelineDto } from '../pipelines/create-pipeline.dto';

export class RegisterAccountDto {
  /** Название аккаунта */
  @IsNotEmpty()
  @IsString()
  name: string;

  /** Данные пользователя */
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;

  /** Данные воронки */
  @ValidateNested()
  @Type(() => CreatePipelineDto)
  pipeline: CreatePipelineDto;
}
