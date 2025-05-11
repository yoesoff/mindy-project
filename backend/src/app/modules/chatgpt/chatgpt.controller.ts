import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ChatGPTService } from './chatgpt.service';

@Controller('chatgpt')
export class ChatGPTController {
  constructor(private readonly chatGPTService: ChatGPTService) {}

  @Get('response')
  async getChatResponse(@Query('prompt') prompt: string) {
    return await this.chatGPTService.getResponse(prompt);
  }

  @Post('response')
  async postChatResponse(@Body('prompt') prompt: string) {
    return await this.chatGPTService.getResponse(prompt);
  }
}
