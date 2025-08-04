import {
  IsNumber,
  IsString,
  IsOptional,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVehicleDto {
  @IsString()
  @IsOptional()
  make?: string;

  @IsString()
  @IsOptional()
  vin?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsString()
  @IsOptional()
  year?: string;

  @IsString()
  @IsOptional()
  licensePlate?: string;

  @IsNumber()
  @IsOptional()
  weight?: number;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  effectiveDt?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  expirationDt?: Date;

  @IsNumber()
  @IsOptional()
  basedOnID?: number;
}
