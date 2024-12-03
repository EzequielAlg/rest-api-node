import { validate } from 'class-validator';
import { BadRequestException, Headers } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { TransactionData } from '../../dto/transaction-data.dto';
import { PaymentService } from '../../services/payment.service';

@Controller('internal-token/payments')
export class CryptogramPaymentController {

  constructor(private readonly paymentService: PaymentService) { }

  @Post()
  async cryptogramPayment(@Body() request: TransactionData, @Headers('apikey') apikey : string ) {
    
    if (!apikey) {
      throw new BadRequestException({ message: 'No API key found in request' });
    }
    const errors = await validate(request);

    if (errors.length > 0) {
      console.log(errors);
      throw new BadRequestException('Validation failed');
    }

    return this.paymentService.getCryptogramPayment(request, apikey);
  }
}