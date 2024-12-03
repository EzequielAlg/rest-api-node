import { Controller, Post, Req,Headers, UseInterceptors } from '@nestjs/common';
import { CheckoutService } from '../services/checkout.service';
import { ApiKeyInterceptor } from '../interceptors/api-key.interceptor';

@Controller('checkout/link')
export class CheckoutController {
  constructor(private readonly  checkoutService : CheckoutService) { }

  @Post()
  @UseInterceptors(ApiKeyInterceptor)
  generateHash(@Req() request: any, @Headers('apikey') apikey : string): any {
    return this.checkoutService.getHash(request.body, apikey);
  }
}