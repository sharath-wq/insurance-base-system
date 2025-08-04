import {
  IsDate,
  IsBoolean,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateQuoteDto {
  @IsOptional()
  @IsBoolean()
  isSelected?: boolean;

  @IsOptional()
  @IsDate()
  quoteDt?: Date;

  @IsOptional()
  @IsNumber()
  premiumAmt?: number;

  @IsOptional()
  @IsNumber()
  taxAmt?: number;

  @IsOptional()
  @IsDate()
  effectiveDt?: Date;

  @IsOptional()
  @IsDate()
  expirationDt?: Date;

  @IsOptional()
  @IsNumber()
  surchargeAmt?: number;

  @IsOptional()
  @IsNumber()
  policyID?: number;
}
