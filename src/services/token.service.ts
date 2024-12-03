import { Injectable } from '@nestjs/common';
import { TokenRequest } from '../dto/token-request.dto';
require('dotenv').config();

@Injectable()
export class TokenService {

  private sdkModulo = require('teamv-sdk-node');
  private sdkMod: any;


  async getToken(request: any, apikey : string): Promise<any> {
    this.sdkMod = new this.sdkModulo.sdk(
      process.env.SDK_ENVIRONMENT,
      apikey,
      process.env.SDK_API_SECRET,
      process.env.SDK_COMPANY,
      process.env.SDK_USER,
    );
    const args = {
      "card_number": request.card_number,
      "card_expiration_month": request.card_expiration_month,
      "card_expiration_year": request.card_expiration_year,
      "card_holder_name": request.card_holder_name,
      "card_holder_birthday": request.card_holder_birthday,
      "card_holder_door_number": request.card_holder_door_number,
      "security_code": request.security_code,
      "card_holder_identification": {
        "type": request.card_holder_identification.type,
        "number": request.card_holder_identification.number
      },
    };

    return new Promise((resolve, reject) => {
      this.sdkMod.tokens(args, (result, error) => {
        console.log(result);
        resolve(result);
      });
    });
  }


  async getInternalToken(request: TokenRequest, apikey : string): Promise<any> {

    this.sdkMod = new this.sdkModulo.sdk(
      process.env.SDK_ENVIRONMENT,
      apikey,
      process.env.SDK_API_SECRET,
      process.env.SDK_COMPANY,
      process.env.SDK_USER,
    );
    return new Promise((resolve, reject) => {
      this.sdkMod.internaltokens(request, (result: any, error: any) => {
        console.log(result);
        resolve(result);
      });
    });
  }
}