import { validate } from 'class-validator';
import { BadRequestException, Headers } from '@nestjs/common';
import { Body, Controller, Post} from '@nestjs/common';
import { TokenRequest } from '../../dto/token-request.dto';
import { TokenService } from '../../services/token.service';

@Controller('internal-token/tokens')
export class internalTokenController {

  constructor(private readonly tokenService: TokenService) { }

  @Post()
  async createToken(@Body() tokenRequest: TokenRequest, @Headers('apikey') apikey : string ) {

    if (!apikey) {
      throw new BadRequestException({ message: 'No API key found in request' });
    }

    const errors = await validate(tokenRequest);

    if (errors.length > 0) {
      console.log(errors);
      throw new BadRequestException('Validation failed');
    }

    return this.tokenService.getInternalToken(tokenRequest, apikey);
  }
}

