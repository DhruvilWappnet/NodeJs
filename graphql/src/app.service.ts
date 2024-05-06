import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  // Define a method that will be executed every 5 seconds
  private readonly logger = new Logger(AppService.name);
  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    console.log('Executing cron job every 5 seconds...');
    this.logger.debug('called');
  }
  getHello(): string {
    return 'Hello World!';
  }
}
