import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ChatGPTService {
  private readonly apiKey = process.env.CHATGPT_API_KEY;
  private readonly apiUrl = process.env.OPENAI_API_URL;


  async getResponse(prompt: string): Promise<string> {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error communicating with ChatGPT API:', error);
      throw error;
    }
  }
}
