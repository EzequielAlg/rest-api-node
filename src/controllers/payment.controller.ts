import {Controller, Get, Post, Req, Headers, Put, Param, UseInterceptors } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { ApiKeyInterceptor } from '../interceptors/api-key.interceptor';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  getPayments(): string {
    return this.paymentService.getPayment();
  }

  @Post()
  @UseInterceptors(ApiKeyInterceptor)
  payment(@Req() request: any , @Headers('apikey') apikey : string ): any{
    return this.paymentService.payment(request.body, apikey);
  }

  @Post('PCITokenized')
  @UseInterceptors(ApiKeyInterceptor)
  tokenizedPCIPayment(@Req() request: any, @Headers('apikey') apikey : string ) : any{
    return this.paymentService.tokenizedPCIpayment(request.body, apikey);
  }

  @Put(':id')
  @UseInterceptors(ApiKeyInterceptor)
  confirmPayment(@Param('id') id: string, @Req() request: any, @Headers('apikey') apikey: string): any {
    return this.paymentService.confirmPayment(id, request.body, apikey);
  }
}
