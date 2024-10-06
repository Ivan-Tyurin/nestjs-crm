import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePipelineDto {
  /** Название воронки */
  @IsNotEmpty()
  @IsString()
  name: string;
}
