import {
  IsNumber,
  IsString,
  IsOptional,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVehicleDto {
  @IsNumber()
  quote_id: number;

  @IsNumber()
  vin: number;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsString()
  year: string;

  @IsString()
  licence_plate: string;

  @IsNumber()
  @IsOptional()
  class_id?: number;

  @IsNumber()
  driver_id: number;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  start_date: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  effective_date: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  expiry_date: Date;

  @IsNumber()
  @IsOptional()
  premium: number;

  @IsNumber()
  @IsOptional()
  premium_novat: number;

  @IsNumber()
  @IsOptional()
  vat: number;

  @IsNumber()
  @IsOptional()
  total_fee?: number;

  @IsNumber()
  @IsOptional()
  total_discount: number;

  @IsBoolean()
  @IsOptional()
  is_endorsement?: boolean;

  @IsString()
  @IsOptional()
  endorsment_type?: string;

  @IsNumber()
  insurance_id: number;

  @IsNumber()
  @IsOptional()
  payment_refference_id: number;
}
