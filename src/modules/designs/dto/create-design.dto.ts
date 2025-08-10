import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDesignDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  fileUrl?: string;
}
