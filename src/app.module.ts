import { Module } from '@nestjs/common';
import { PaymentController } from './controllers/payment.controller';
import { PaymentService } from './services/payment.service';
import { TokenController } from './controllers/token.controller';
import { HealthcheckController } from './controllers/healthcheck.controller';
import { TokenService } from './services/token.service';
import { internalTokenController } from './controllers/internal-tokenization/token.controller';
import { CryptogramPaymentController } from './controllers/internal-tokenization/payment.controller';
import { ThreeDSController } from './controllers/threeDSinstruction.controller';
import { ThreeDSService } from "./services/threeDSinstruction.service";
import { CheckoutController } from './controllers/checkout.controller';
import { CheckoutService } from './services/checkout.service';

@Module({
  imports: [],
  controllers: [PaymentController, TokenController, HealthcheckController, internalTokenController, CryptogramPaymentController, ThreeDSController, CheckoutController],
  providers: [PaymentService, TokenService, ThreeDSService, CheckoutService],
})
export class AppModule { }

