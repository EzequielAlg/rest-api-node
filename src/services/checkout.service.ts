import { Injectable } from '@nestjs/common';
require('dotenv').config();
@Injectable()
export class CheckoutService {

  private sdkModulo = require('teamv-sdk-node');
  private sdkMod: any;


  async getHash(request: any, apikey : string): Promise<any> {
    this.sdkMod = new this.sdkModulo.sdk(
      process.env.SDK_ENVIRONMENT,
      process.env.SDK_API_PUBLIC,
      apikey,
      process.env.SDK_COMPANY,
      process.env.SDK_USER,
    );
    const args = {
        "id": request.id,
        "origin_platform": request.origin_platform,
        "payment_description": request.payment_description,
        "products": request.products,
        "total_price": request.total_price,
        "site": request.site,
        "success_url": request.success_url,
        "redirect_url": request.redirect_url,
        "cancel_url": request.cancel_url,
        "notifications_url": request.notifications_url,
        "life_time": request.life_time,
        "template_id": request.template_id,
        "installments": request.installments,
        "id_payment_method": request.id_payment_method,
        "plan_gobierno": request.plan_gobierno,
        "public_apikey": request.public_apikey
    };

    return new Promise((resolve, reject) => {
      this.sdkMod.checkout(args, (result, error) => {
        console.log(result);
        resolve(result);
      });
    });
  }
}
