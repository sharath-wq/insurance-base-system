import { Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  IsDate,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreatePersonDto {
  @IsNumber()
  quote_id: number;

  @IsNumber()
  identity_no: number;

  @IsString()
  emp_id: string;

  @IsString()
  emp_name: string;

  @IsDate()
  @IsOptional()
  dob: Date;

  @IsNumber()
  @IsOptional()
  height: number;

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
  weight: number;

  @IsString()
  industry_type: string;

  @IsString()
  payment_method: string;

  @IsString()
  offering_code: string;

  @IsNumber()
  identity_type_id: number;

  @IsString()
  name_en: string;

  @IsString()
  name_ar: string;

  @IsString()
  email: string;

  @IsNumber()
  mobile: number;

  @IsNumber()
  nationality_id: number;

  @IsNumber()
  occupation_id: number;

  @IsNumber()
  relation_id: number;

  @IsNumber()
  marital_status_id: number;

  @IsString()
  gender_code: string;

  @IsNumber()
  company_id: number;

  @IsString()
  member_type: string;

  @IsString()
  member_status: string;

  @IsNumber()
  @IsOptional()
  account_id: number;

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
  total_fee: number;

  @IsNumber()
  @IsOptional()
  total_discount: number;

  @IsNumber()
  @IsOptional()
  payment_refference_id: number;

  @IsBoolean()
  @IsOptional()
  is_endorsement?: boolean;

  @IsString()
  @IsOptional()
  endorsment_type?: string;
}
