import { Controller, Post, Req, Headers, UseInterceptors } from '@nestjs/common';
import { TokenService } from '../services/token.service';
import { ApiKeyInterceptor } from '../interceptors/api-key.interceptor';

@UseInterceptors(ApiKeyInterceptor)
@Controller('tokens')
export class TokenController {
  constructor(private readonly tokenService: TokenService) { }

  @Post()
  getToken(@Req() request: any, @Headers('apikey') apikey : string ): any {
    return this.tokenService.getToken(request.body, apikey);
  }
}
