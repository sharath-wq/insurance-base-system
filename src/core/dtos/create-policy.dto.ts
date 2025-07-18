import {
  IsNumber,
  IsDate,
  IsBoolean,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreatePolicyDto {
  @IsNumber()
  quote_id: number;

  @IsNumber()
  status_id: number;

  @IsNumber()
  lob_id: number;

  @IsNumber()
  policy_status_id: number;

  @IsNumber()
  account_id: number;

  @IsDate()
  @IsOptional()
  start_date: Date;

  @IsDate()
  @IsOptional()
  effective_date: Date;

  @IsDate()
  @IsOptional()
  expiry_date: Date;

  @IsNumber()
  @IsOptional()
  vat: number;

  @IsNumber()
  @IsOptional()
  total_fee: number;

  @IsNumber()
  @IsOptional()
  total_discount?: number;

  @IsNumber()
  @IsOptional()
  premium: number;

  @IsNumber()
  @IsOptional()
  premium_novat: number;

  @IsNumber()
  payment_refference_id: number;

  @IsBoolean()
  @IsOptional()
  is_endorsement: boolean;

  @IsString()
  @IsOptional()
  endorsment_type: string;
}
