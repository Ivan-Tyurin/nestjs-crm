import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateUserDto } from '../users/create-user.dto';
import { Type } from 'class-transformer';
import { CreatePipelineDto } from '../pipelines/create-pipeline.dto';

export class CreateAccountDto {
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
