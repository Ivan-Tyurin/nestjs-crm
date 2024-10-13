import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePipelineDto {
  /** ID аккаунта */
  @IsOptional()
  @IsNumber()
  accountId?: number;

  /** Название воронки */
  @IsNotEmpty()
  @IsString()
  name: string;
}
