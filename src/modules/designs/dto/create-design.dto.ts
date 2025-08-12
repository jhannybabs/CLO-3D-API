import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDesignDto {
  @IsString()
  @IsNotEmpty()
  designName: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}
