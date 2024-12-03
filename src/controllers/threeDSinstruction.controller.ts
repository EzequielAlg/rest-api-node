import { Controller, Post, Req, Headers, UseInterceptors, BadRequestException } from '@nestjs/common';
import { ThreeDSService } from '../services/threeDSinstruction.service';
import { ApiKeyInterceptor } from '../interceptors/api-key.interceptor';

@UseInterceptors(ApiKeyInterceptor)
@Controller('threeds/instruction')
export class ThreeDSController {
  constructor(private readonly threeDSservice: ThreeDSService) { }

  @Post()
  threeDSinstruction(@Req() request: any, @Headers('apikey') apikey : string, @Headers('X-Consumer-Username') consumer : string ): any {
    if (!consumer) {
      throw new BadRequestException({ message: 'No consumer found in request' });
    }
    return this.threeDSservice.threeDSinstruction(request.body, apikey , consumer);
  }
}