import { Injectable } from '@nestjs/common';

@Injectable()
export class DefaultApiService {
  getDefaultMessage(): { message: string } {
    return { message: 'Default API is working!' };
  }
}
