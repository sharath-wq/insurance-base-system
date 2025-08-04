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

  // Quote date will be automatically set to current date during creation
  @IsOptional()
  @IsDate()
  quoteDt?: Date;

  @IsOptional()
  @IsNumber()
  premiumAmt?: number;

  @IsOptional()
  @IsNumber()
  taxAmt?: number;

  // Effective date comes from frontend
  @IsOptional()
  @IsDate()
  effectiveDt?: Date;

  // Expiration date will be automatically calculated as effectiveDt + 1 year
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
