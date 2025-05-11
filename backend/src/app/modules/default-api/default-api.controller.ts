import { Controller, Get } from '@nestjs/common';
import { DefaultApiService } from './default-api.service';

@Controller('default-api')
export class DefaultApiController {
  constructor(private readonly defaultApiService: DefaultApiService) {}

  @Get()
  getDefaultMessage() {
    return this.defaultApiService.getDefaultMessage();
  }

  @Get('status')
  getModuleStatus() {
    return { status: 'DefaultApi module is active!' };
  }
}
