import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminService {
  constructor(private readonly configService: ConfigService) {
    const url = this.configService.get<string>('ADMIN_DATABASE.URL');
    console.log(url);
  }
}
