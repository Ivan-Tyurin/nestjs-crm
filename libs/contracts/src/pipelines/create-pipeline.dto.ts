import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePipelineDto {
  /** ID аккаунта */
  @IsNotEmpty()
  @IsNumber()
  accountId: number;

  /** Название воронки */
  @IsNotEmpty()
  @IsString()
  name: string;
}
