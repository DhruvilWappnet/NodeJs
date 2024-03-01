import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { logService } from './demo.service';
import {
  UserAgentOptions,
  checkauth,
  checkauthentication,
} from 'src/middleware/auth.middleware';

@Module({
  controllers: [AuthController],
  providers: [
    { provide: 'store', useClass: AuthService },
    logService,
    { provide: 'Database_name', useValue: 'TheFirst' },
    {
      provide: UserAgentOptions,
      useValue: { accepted: ['chrome'] },
    },
  ],
  exports: [AuthService, logService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(checkauthentication).forRoutes('auth');
  }
}
