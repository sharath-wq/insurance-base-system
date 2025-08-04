import {
  IsNumber,
  IsDate,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ListPolicyStatus, ListProduct, ListTransactionType, ListPaymentScheduleType } from '../../common/enums';

export class CreatePolicyDto {
  @IsString()
  @IsOptional()
  QuoteNo?: string;

  @IsDate()
  @IsOptional()
  startDt?: Date;

  @IsDate()
  @IsOptional()
  endDt?: Date;

  @IsDate()
  @IsOptional()
  quoteDt?: Date;

  @IsDate()
  @IsOptional()
  issueDt?: Date;

  @IsNumber()
  @IsOptional()
  premiumAmt?: number;

  @IsNumber()
  @IsOptional()
  taxAmt?: number;

  @IsEnum(ListPolicyStatus)
  @IsOptional()
  status?: ListPolicyStatus;

  @IsNumber()
  @IsOptional()
  holderID?: number;

  @IsDate()
  @IsOptional()
  firstStartDt?: Date;

  @IsDate()
  @IsOptional()
  rejectDt?: Date;

  @IsString()
  @IsOptional()
  rejectReason?: string;

  @IsNumber()
  @IsOptional()
  tripID?: number;

  @IsString()
  @IsOptional()
  Number?: string;

  @IsEnum(ListProduct)
  @IsOptional()
  productID?: ListProduct;

  @IsDate()
  @IsOptional()
  effectiveDt?: Date;

  @IsDate()
  @IsOptional()
  expirationDt?: Date;

  @IsEnum(ListTransactionType)
  @IsOptional()
  txnTypeID?: ListTransactionType;

  @IsNumber()
  @IsOptional()
  surchargeAmt?: number;

  @IsEnum(ListPaymentScheduleType)
  @IsOptional()
  paymentSchdTypeID?: ListPaymentScheduleType;

  @IsNumber()
  @IsOptional()
  agentID?: number;

  @IsNumber()
  @IsOptional()
  basedOnID?: number;
}
