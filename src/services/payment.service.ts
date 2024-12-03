import { Injectable } from '@nestjs/common';
import { TransactionData } from '../dto/transaction-data.dto';
require('dotenv').config();

@Injectable()
export class PaymentService {
  getPayment(): string {
    return 'funciona payment';
  }

  // private sdkModulo = require('../../src/sdk-node-ventaonline/lib/sdk');
  private sdkModulo = require('teamv-sdk-node');
  private sdkMod: any;

  async payment(request: any, apikey: string): Promise<any> {
  
    this.sdkMod =  new this.sdkModulo.sdk(
      process.env.SDK_ENVIRONMENT,
      process.env.SDK_API_KEY,
      apikey,
      process.env.SDK_COMPANY,
      process.env.SDK_USER,
    );

    const args = {
      "site_transaction_id": request.site_transaction_id,
      "token": request.token,
      "payment_method_id": request.payment_method_id,
      "bin": request.bin,
      "amount": request.amount,
      "currency": request.currency,
      "installments": request.installments,
      "payment_type": request.payment_type,
      "sub_payments": [],
      "cardholder_auth_required": request.cardholder_auth_required,
      "auth_3ds_data": request.auth_3ds_data ? request.auth_3ds_data : []
    }
    return new Promise((resolve, reject) => {
      this.sdkMod.payment(args, (result, error) => {
        console.log(result);
        resolve(result);
      });
    });

  }

  async getCryptogramPayment(request: TransactionData, apikey : string): Promise<any> {
    this.sdkMod = new this.sdkModulo.sdk(
      process.env.SDK_ENVIRONMENT,
      process.env.SDK_API_KEY,
      apikey,
      process.env.SDK_COMPANY,
      process.env.SDK_USER,
    );
    return new Promise((resolve, reject) => {
      this.sdkMod.cryptogramPayment(request, (result: any, error: any) => {
        console.log(result);
        resolve(result);
      });
    });
  }

  async tokenizedPCIpayment(request: any, apikey : string): Promise<any> {
    
    this.sdkMod = new this.sdkModulo.sdk(
      process.env.SDK_ENVIRONMENT,
      process.env.SDK_API_KEY,
      apikey,
      process.env.SDK_COMPANY,
      process.env.SDK_USER,
    );

    const args = {
      "site_transaction_id": request.site_transaction_id,
      "payment_method_id": request.payment_method_id,
      "bin": request.bin,
      "amount": request.amount,
      "currency": request.currency,
      "installments": request.installments,
      "payment_type": request.payment_type,
      "sub_payments": [],
      "fraud_detection": request.fraud_detection,
      "card_data": request.card_data,
      "is_tokenized_payment": request.is_tokenized_payment,
      "token_card_data": request.token_card_data,
      "aggregate_data": request.aggregate_data

    }
    return new Promise((resolve, reject) => {
      this.sdkMod.tokenizedPCIPayment(args, (result, error) => {
        resolve(result);
      });
    });
  }

  async confirmPayment(id: string, request: any, apikey: string): Promise<any> {
    this.sdkMod = new this.sdkModulo.sdk(
      process.env.SDK_ENVIRONMENT,
      process.env.SDK_API_KEY,
      apikey,
      process.env.SDK_COMPANY,
      process.env.SDK_USER,
    );

    return new Promise((resolve, reject) => {
      this.sdkMod.confirmPayment(id, request, (result: any, error: any) => {
        console.log(result);
        resolve(result);
      });
    });
  }
}
