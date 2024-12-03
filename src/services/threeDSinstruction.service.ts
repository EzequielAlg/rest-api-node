import { Injectable } from '@nestjs/common';
require('dotenv').config();
// import {sdk} from '../../sdk/sdk-node-ventaonline';
// import {tokens} from '../../sdk/sdk-node-ventaonline/lib/requests/tokensRequests';
import { sdk } from 'teamv-sdk-node';
@Injectable()
export class ThreeDSService {

  private sdkModulo = require('teamv-sdk-node');
  private sdkMod: any;


  async threeDSinstruction(request: any, apikey : string, consumer : string): Promise<any> {
    this.sdkMod = new this.sdkModulo.sdk(
      process.env.SDK_ENVIRONMENT,
      process.env.SDK_API_KEY,
      apikey,
      process.env.SDK_COMPANY,
      process.env.SDK_USER,
      consumer
    );
    console.log("apikey " + apikey)
    const args = {
      "id": request.id,
      "instruction_value": request.instruction_value,
    };

    return new Promise((resolve, reject) => {
      this.sdkMod.threeDSinstruction(args, (result, error) => {
        console.log(result);
        resolve(result);
      });
    });
  }
}