import {
  IsString,
  IsDate,
  IsBoolean,
  IsObject,
  IsNotEmpty,
} from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  @IsNotEmpty()
  quote_name: string;

  @IsDate()
  @IsNotEmpty()
  effective_date: Date;

  @IsDate()
  @IsNotEmpty()
  expiration_date: Date;

  @IsString()
  @IsNotEmpty()
  agency: string;

  @IsString()
  @IsNotEmpty()
  producer: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  risk_state: string;

  @IsBoolean()
  is_existing_policy: boolean;

  @IsObject()
  @IsNotEmpty()
  applicant_details: any;

  @IsNotEmpty()
  lob_id: number;
}
