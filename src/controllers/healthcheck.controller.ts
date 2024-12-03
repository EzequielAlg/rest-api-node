import {Controller, Get } from '@nestjs/common';

@Controller('healthcheck')
export class HealthcheckController {
  constructor() {}

  @Get()
  getPayments(): string {
    const date = new Date();
    const response : any = {
        api_name : "API NODE JS",
        time : date
    }
    return response;
  }
}