import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Matches, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AggregateData {
  @IsString()
  indicator: string;

  @IsString()
  identification_number: string;

  @IsString()
  bill_to_pay: string;

  @IsString()
  bill_to_refund: string;

  @IsString()
  merchant_name: string;

  @IsString()
  street: string;

  @IsString()
  number: string;

  @IsString()
  postal_code: string;

  @IsString()
  category: string;

  @IsString()
  channel: string;

  @IsString()
  geographic_code: string;

  @IsString()
  city: string;

  @IsString()
  merchant_id: string;

  @IsString()
  province: string;

  @IsString()
  country: string;

  @IsString()
  merchant_email: string;

  @IsString()
  merchant_phone: string;
}

class SubPayment {
  @IsString()
  site_id: string;

  @IsInt()
  installments: number;

  @IsString()
  amount: string;

  @IsOptional()
  @IsString()
  ticket: string;

  @IsOptional()
  @IsString()
  card_authorization_code: string;

  @IsOptional()
  @IsInt()
  sub_payment_id: number;

  @IsOptional()
  @IsString()
  status: string;
}

class Invoice {
  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsNotEmpty()
  date: string;
}

export class TransactionData {
  @IsString()
  @IsNotEmpty()
  merchant_transaction_id: string;

  @IsOptional()
  @IsString()
  original_transaction_id: string;

  @IsInt()
  @IsNotEmpty()
  payment_method_id: number;

  @IsString()
  @IsNotEmpty()
  amount: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsOptional()
  installments: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AggregateData)
  aggregate_data: AggregateData;

  @IsString()
  @IsNotEmpty()
  payment_type: string;

  @ValidateNested({ each: true })
  @Type(() => SubPayment)
  sub_payments: SubPayment[];

  @IsString()
  @IsNotEmpty()
  description: string;

  @ValidateNested()
  @Type(() => Invoice)
  @IsNotEmpty()
  invoice: Invoice;

  @IsOptional()
  @IsBoolean()
  store_credential: boolean;
}
